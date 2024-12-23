import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from typing import List, Dict, Any
import json
import os

class RepoMatcher:
    def __init__(self):
        # Load SpaCy model for NLP tasks
        self.nlp = spacy.load("en_core_web_sm")
        
        # Initialize technology categories
        self.tech_categories = {
            "machine_learning": ["tensorflow", "pytorch", "scikit-learn", "keras", "ml", "ai", "deep-learning"],
            "web_development": ["react", "vue", "angular", "django", "flask", "nodejs", "frontend", "backend"],
            "data_science": ["pandas", "numpy", "jupyter", "data-analysis", "visualization"],
            "devops": ["docker", "kubernetes", "aws", "ci-cd", "deployment"],
            "database": ["mysql", "postgresql", "mongodb", "redis", "sql", "nosql"],
            "mobile": ["android", "ios", "flutter", "react-native", "mobile-app"],
            "security": ["encryption", "authentication", "security", "cyber-security"]
        }

    def extract_tags(self, project_description: str) -> List[str]:
        """Extract relevant tags from project description."""
        doc = self.nlp(project_description.lower())
        
        # Extract technical terms and keywords
        tags = []
        
        # Extract noun phrases
        for chunk in doc.noun_chunks:
            tags.append(chunk.text.strip())
        
        # Extract technical terms based on predefined categories
        for category, terms in self.tech_categories.items():
            for term in terms:
                if term in project_description.lower():
                    tags.append(term)
        
        # Clean and deduplicate tags
        cleaned_tags = list(set([tag.replace(" ", "-") for tag in tags if len(tag) > 2]))
        return cleaned_tags

    def find_similar_repos(self, tags: List[str], github_token: str = None) -> List[Dict]:
        """Search GitHub for repositories with similar tags."""
        similar_repos = []
        headers = {}
        if github_token:
            headers['Authorization'] = f'token {github_token}'
        
        # Search for each tag
        for tag in tags:
            try:
                # GitHub search API endpoint
                url = f'https://api.github.com/search/repositories?q={tag}+in:topics+in:description&sort=stars&order=desc'
                response = requests.get(url, headers=headers)
                
                if response.status_code == 200:
                    repos = response.json().get('items', [])
                    
                    # Process each repository
                    for repo in repos[:5]:  # Get top 5 repos for each tag
                        repo_info = {
                            'name': repo['full_name'],
                            'description': repo['description'],
                            'url': repo['html_url'],
                            'stars': repo['stargazers_count'],
                            'matching_tag': tag,
                            'topics': repo.get('topics', [])
                        }
                        similar_repos.append(repo_info)
                
            except Exception as e:
                print(f"Error searching for tag {tag}: {str(e)}")
                continue
        
        # Remove duplicates and sort by stars
        unique_repos = {repo['name']: repo for repo in similar_repos}.values()
        return sorted(unique_repos, key=lambda x: x['stars'], reverse=True)

    def analyze_project(self) -> Dict[str, Any]:
        """Main function to analyze project and find similar repositories."""
        # Get project description from user
        print("\nPlease enter your project description:")
        project_description = input()
        
        # Extract tags
        tags = self.extract_tags(project_description)
        
        # Optional: Get GitHub token
        github_token = os.getenv('GITHUB_TOKEN')  # You can set this as an environment variable
        
        # Find similar repositories
        similar_repos = self.find_similar_repos(tags, github_token)
        
        # Prepare output
        analysis_result = {
            "project_description": project_description,
            "extracted_tags": tags,
            "similar_repositories": similar_repos[:10]  # Return top 10 similar repos
        }
        
        return analysis_result

def display_results(results: Dict[str, Any]):
    """Display the analysis results in a readable format."""
    print("\n=== Project Analysis Results ===")
    print("\nExtracted Tags:")
    for tag in results['extracted_tags']:
        print(f"- {tag}")
    
    print("\nSimilar Repositories:")
    for repo in results['similar_repositories']:
        print(f"\nRepository: {repo['name']}")
        print(f"Description: {repo['description']}")
        print(f"URL: {repo['url']}")
        print(f"Stars: {repo['stars']}")
        print(f"Matching Tag: {repo['matching_tag']}")
        print(f"Topics: {', '.join(repo['topics'])}")

def main():
    try:
        # Initialize and run analysis
        matcher = RepoMatcher()
        results = matcher.analyze_project()
        
        # Display results
        display_results(results)
        
        # Optionally save results to file
        with open('analysis_results.json', 'w') as f:
            json.dump(results, f, indent=2)
            print("\nResults have been saved to 'analysis_results.json'")
            
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()