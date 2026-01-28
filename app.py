python3 app.python3
from flask import Flask, render_template, request
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        skills = request.form["skills"]
        interest = request.form["interest"]
        goal = request.form["goal"]
        result = generate_career_response(skills, interest, goal)
        return render_template("result.html", **result)
    return render_template("index.html")

def generate_career_response(skills, interest, goal):
    interest = interest.lower()

    if "data" in interest:
        career = "Data Scientist"
        roadmap = [
            "Python & Statistics",
            "Machine Learning",
            "Data Visualization",
            "Deep Learning",
            "Model Deployment"
        ]
    elif "web" in interest or "frontend" in interest or "backend" in interest:
        career = "Full Stack Developer"
        roadmap = [
            "HTML, CSS, JavaScript",
            "Frontend Frameworks",
            "Backend Development",
            "Databases",
            "System Design"
        ]
    elif "ai" in interest or "machine learning" in interest:
        career = "AI / ML Engineer"
        roadmap = [
            "Python & Math",
            "Machine Learning",
            "Deep Learning",
            "NLP & CV",
            "MLOps"
        ]
    elif "business" in interest or "analysis" in interest:
        career = "Business Analyst"
        roadmap = [
            "Excel & SQL",
            "Data Analysis",
            "Business Intelligence Tools",
            "Stakeholder Communication",
            "Domain Knowledge"
        ]
    elif "cyber" in interest or "security" in interest or "hacking" in interest or "infosec" in interest:
        career = "Cybersecurity Analyst"
        roadmap = [
            "Networking Fundamentals",
            "Security Fundamentals",
            "Ethical Hacking",
            "Cloud Security",
            "Incident Response"
        ]
    elif "cloud" in interest or "devops" in interest or "aws" in interest or "azure" in interest:
        career = "Cloud/DevOps Engineer"
        roadmap = [
            "Linux & Networking",
            "Cloud Platforms",
            "Containers & Kubernetes",
            "CI/CD Pipelines",
            "Infrastructure as Code"
        ]
    elif "mobile" in interest or "android" in interest or "ios" in interest or "app" in interest:
        career = "Mobile App Developer"
        roadmap = [
            "Programming Basics",
            "Mobile UI/UX",
            "Native Development",
            "Cross-Platform Frameworks",
            "App Deployment"
        ]
    else:
        career = "Software Engineer"
        roadmap = [
            "Programming Fundamentals",
            "DSA",
            "Problem Solving",
            "System Design",
            "Project Development"
        ]

    return {
        "career": career,
        "roadmap": roadmap,
        "skills": skills,
        "interest": interest,
        "goal": goal
    }


if __name__ == "__main__":
    app.run(debug=True)

