import zipfile
from pathlib import Path
from xml.sax.saxutils import escape

out = Path(r"C:\Users\mohit sharma\Downloads\cover_page - Cloud Engineering and DevOps Automation - updated.docx")

def p(text, style="Normal", center=False):
    jc = '<w:jc w:val="center"/>' if center else ""
    return f'<w:p><w:pPr><w:pStyle w:val="{style}"/>{jc}</w:pPr><w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'

sections = [
    ("Title", ["Intelligent Course Selling & Recommendation Platform", "Project Report"], True),
    ("Heading1", ["Abstract"], False),
    ("Normal", ["This project presents a full-stack online learning platform named LEARN & IMPROVE, developed as an Intelligent Course Selling & Recommendation Platform. The system supports user authentication, course publishing, course discovery, payment-based enrollment, progress tracking, reviews, and instructor analytics using React, Node.js, Express.js, MongoDB, Razorpay, Cloudinary, and Nodemailer. The current implementation provides strong operational features and stores the data needed for future recommendation and analytics enhancements."], False),
    ("Heading1", ["Abbreviations"], False),
    ("Normal", ["API - Application Programming Interface", "JWT - JSON Web Token", "OTP - One Time Password", "DFD - Data Flow Diagram", "ML - Machine Learning", "RBAC - Role Based Access Control"], False),
    ("Heading1", ["List of Figures"], False),
    ("Normal", ["Figure 1. System architecture", "Figure 2. User workflow", "Figure 3. Block diagram", "Figure 4. DFD", "Figure 5. Sequence diagram", "Figure 6. Dashboard graph"], False),
    ("Heading1", ["1. CHAPTER 1 - INTRODUCTION"], False),
    ("Heading2", ["1.1. Chapter Overview"], False),
    ("Normal", ["Online education has shifted from simple content delivery to integrated digital learning ecosystems. A modern platform must support secure access, content management, transaction handling, learner tracking, and feedback mechanisms. This project addresses those needs through a full-stack web application where students can register, browse courses, purchase content, learn through structured modules, and monitor progress, while instructors can publish and manage courses through a dedicated dashboard."], False),
    ("Heading2", ["1.2. History"], False),
    ("Normal", ["The development of online education moved from static tutorial websites to LMS platforms and then to MOOC-based course marketplaces. As the number of courses increased, research began focusing on personalization, instructor credibility, learner trust, and engagement. This project belongs to that modern phase, combining marketplace functionality with progress-aware learning and architecture prepared for future intelligent recommendation features."], False),
    ("Heading2", ["1.3. Requirements"], False),
    ("Normal", ["The functional requirements include signup, login, OTP verification, profile management, course creation, section and lecture handling, course browsing, payment processing, enrollment, ratings, reviews, and progress tracking. The non-functional requirements include security, modularity, maintainability, scalability, and responsive user experience. JWT authentication, MongoDB-based storage, and third-party integrations make the system suitable for practical deployment."], False),
    ("Heading2", ["1.4. Merits & Demerits"], False),
    ("Normal", ["The main merits of the system are complete workflow support, modular backend design, secure authentication, payment integration, feedback support, and learner progress monitoring. The main demerit is that the project title suggests an intelligent recommendation engine, while the current version mainly provides structured discovery through categories, reviews, and course visibility rather than full ML-based recommendation."], False),
    ("Heading2", ["1.5. Chapter summary"], False),
    ("Normal", ["This chapter introduced the project background, key requirements, strengths, and current limitations, establishing the need for an integrated course selling and learning platform."], False),
    ("Heading1", ["2. CHAPTER 2 - LITERATURE SURVEY"], False),
    ("Heading2", ["2.1. Study of existing system"], False),
    ("Normal", ["Existing e-learning systems such as Coursera, Udemy, and institutional LMS platforms have proven the usefulness of digital education, but many still separate content delivery from behavior-aware personalization. Research shows that ratings, reviews, instructor credibility, learner engagement, and recommendation logic play an important role in course selection and long-term platform use."], False),
    ("Heading2", ["2.2. Drawbacks"], False),
    ("Normal", ["Many current systems provide large catalogs but limited personalization. Learners often face decision fatigue, and platforms may not fully use review history, progress data, or enrollment behavior to guide future discovery. This creates a need for a unified system that combines secure transactions, learning analytics, and future recommendation support."], False),
    ("Heading2", ["2.3. Required modifications / New proposed system"], False),
    ("Normal", ["The proposed system integrates authentication, course marketplace functionality, instructor-side publishing, learner progress tracking, payment verification, and review collection into one architecture. It also stores the data required for future recommendation features, making it both a working product and a research-ready platform."], False),
    ("Heading1", ["3. CHAPTER 3 - ARCHITECTURE"], False),
    ("Heading2", ["3.1. Algorithms"], False),
    ("Normal", ["The system uses bcrypt for password hashing, JWT for authentication, OTP generation for verification, average rating calculation for course feedback, duration aggregation for course length, and progress percentage logic for learner tracking. Payment verification uses Razorpay signature validation. The architecture can later support hybrid recommendation based on category similarity, ratings, and learner behavior."], False),
    ("Heading2", ["3.2. Block diagrams"], False),
    ("Normal", ["The block architecture consists of a React frontend, a Node.js and Express.js backend, a MongoDB database, and service integrations such as Cloudinary, Razorpay, and Nodemailer. The frontend handles interaction, the backend controls business logic, the database stores persistent entities, and third-party services handle specialized tasks such as payments, email, and media delivery."], False),
    ("Heading2", ["3.3. DFD"], False),
    ("Normal", ["The DFD includes learner, instructor, and administrator entities interacting with Authentication Management, Course Management, Enrollment Processing, Review Management, and Progress Tracking. Data flows between the user interface, backend APIs, database collections, and external services in a controlled and modular way."], False),
    ("Heading2", ["3.4. Sequence diagrams"], False),
    ("Normal", ["The main sequence flows include signup and login, payment and enrollment verification, and lecture completion with progress updates. These flows show how the frontend, backend, database, and external services work together to execute secure and consistent transactions."], False),
    ("Heading1", ["4. CHAPTER 4 - SIMULATION/RESULTS"], False),
    ("Heading2", ["4.1. Modelling"], False),
    ("Normal", ["The system is modeled around User, Profile, Course, Section, SubSection, RatingAndReview, and CourseProgress entities. Practical simulation begins with user registration, continues through course browsing and payment, and ends with content access, lecture completion, and instructor-side dashboard updates."], False),
    ("Heading2", ["4.2. Software being used"], False),
    ("Normal", ["React, Redux Toolkit, Tailwind CSS, and React Router are used on the frontend. Node.js, Express.js, Mongoose, MongoDB, JWT, bcryptjs, Razorpay, Cloudinary, Nodemailer, and Chart.js are used on the backend and service side. Together, these technologies form a modern and maintainable full-stack solution."], False),
    ("Heading2", ["4.3. Graphs"], False),
    ("Normal", ["The platform supports instructor graphs for student count and income per course. It can also support progress graphs, rating distribution graphs, and category popularity graphs because the required data is already stored in the system."], False),
    ("Heading1", ["5. CHAPTER 5 - CONCLUSION"], False),
    ("Heading2", ["5.1. Technical aspect"], False),
    ("Normal", ["Technically, the project demonstrates a modular and secure full-stack implementation with protected routes, schema-based data management, third-party service integration, and reusable frontend state handling. It provides a stable foundation for advanced analytics and future personalization."], False),
    ("Heading2", ["5.2. Implementation"], False),
    ("Normal", ["The implementation proves that the project is not only theoretical. It supports registration, authentication, course creation, course purchase, media-based learning, progress tracking, and instructor analytics in one working application."], False),
    ("Heading2", ["5.3. Annual"], False),
    ("Normal", ["From an annual academic perspective, the system can support multiple course cycles, multiple instructors, and continuous learner activity over a semester or full academic year. Its modular structure makes it suitable for long-term academic use and future expansion."], False),
    ("Heading1", ["6. CHAPTER 6 - FUTURE AND SCOPE"], False),
    ("Heading2", ["6.1. Future Research aspect on proposed topic"], False),
    ("Normal", ["The main future research direction is to implement a true recommendation engine using collaborative filtering, content-based recommendation, or hybrid methods. The current platform already stores the learner-course interactions required for such work."], False),
    ("Heading2", ["6.2. Area of future development"], False),
    ("Normal", ["Future development can include recommendation modules, sentiment analysis on reviews, real-time notifications, certificates, live classes, discussion forums, improved search, and advanced analytics dashboards."], False),
    ("Heading2", ["6.3. Merit and Demerit on proposed system"], False),
    ("Normal", ["The proposed intelligent system can improve learner satisfaction, course discoverability, and instructor visibility. Its main challenges will be cold-start issues, data quality dependence, fairness, and privacy-aware design."], False),
    ("Heading2", ["6.4. Future enhancement"], False),
    ("Normal", ["Future enhancement should begin with hybrid recommendation and richer analytics, followed by features such as retention prediction, adaptive learning suggestions, and stronger mobile support."], False),
    ("Heading1", ["7. CHAPTER 7 - REFRENCES"], False),
    ("Normal", ["1. Aher, S. B., and Lobo, L. M. R. J. (2013). Combination of machine learning algorithms for recommendation of courses in E-Learning System based on historical data. https://doi.org/10.1016/j.knosys.2013.04.015", "2. Madani, Y., Erritali, M., Bengourram, J., and Sailhan, F. (2019). Social collaborative filtering approach for recommending courses in an e-learning platform. https://www.sciencedirect.com/science/article/pii/S1877050919306337", "3. Khanal, S. S., Prasad, P. W. C., Alsadoon, A., and Maag, A. (2020). A systematic review: machine learning based recommendation systems for e-learning. https://doi.org/10.1007/s10639-019-10063-9", "4. React Documentation. https://react.dev/", "5. Node.js Documentation. https://nodejs.org/", "6. Express.js Documentation. https://expressjs.com/", "7. MongoDB Documentation. https://www.mongodb.com/docs/"], False),
    ("Heading1", ["8. RESEARCH PAPER"], False),
    ("Normal", ["The most suitable research foundation for this project is the paper A systematic review: machine learning based recommendation systems for e-learning by Khanal et al. It explains why collaborative, content-based, and hybrid recommendation techniques are important in educational platforms. The paper is directly relevant because the current project already stores enrollment, category, rating, review, and progress data, which can later be used to implement a practical hybrid recommendation engine."], False),
]

body = []
for style, lines, center in sections:
    for line in lines:
        body.append(p(line, style=style, center=center))
    body.append("<w:p/>")

document = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>{"".join(body)}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body>
</w:document>'''

styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:sz w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:sz w:val="30"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:sz w:val="26"/></w:rPr></w:style>
</w:styles>'''

types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>'''

rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

docrels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''

with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    z.writestr("[Content_Types].xml", types)
    z.writestr("_rels/.rels", rels)
    z.writestr("word/document.xml", document)
    z.writestr("word/styles.xml", styles)
    z.writestr("word/_rels/document.xml.rels", docrels)

print(out)
