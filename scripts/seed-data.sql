-- Seed data for The College Periodical

-- Insert categories
INSERT INTO categories (name, slug, description, color) VALUES
('Education', 'education', 'Articles about academic life and learning', '#3B82F6'),
('Health', 'health', 'Mental and physical health topics', '#10B981'),
('Technology', 'technology', 'Tech trends and digital innovation', '#8B5CF6'),
('Business', 'business', 'Entrepreneurship and career development', '#F59E0B'),
('Arts', 'arts', 'Creative expression and cultural topics', '#EC4899'),
('Environment', 'environment', 'Sustainability and environmental issues', '#059669'),
('Sports', 'sports', 'Athletic events and fitness', '#DC2626'),
('Culture', 'culture', 'Campus culture and social issues', '#7C3AED'),
('News', 'news', 'Campus news and current events', '#374151'),
('Opinion', 'opinion', 'Editorial and opinion pieces', '#6B7280');

-- Insert sample users
INSERT INTO users (email, name, role, bio) VALUES
('sarah.johnson@college.edu', 'Sarah Johnson', 'author', 'Senior studying Psychology with a passion for mental health advocacy.'),
('michael.chen@college.edu', 'Michael Chen', 'author', 'Computer Science major interested in AI and machine learning.'),
('emma.davis@college.edu', 'Emma Davis', 'author', 'Environmental Science student and sustainability advocate.'),
('alex.rodriguez@college.edu', 'Alex Rodriguez', 'author', 'Business major and aspiring entrepreneur.'),
('priya.patel@college.edu', 'Priya Patel', 'author', 'Engineering student promoting diversity in STEM.'),
('jordan.williams@college.edu', 'Jordan Williams', 'author', 'Art therapy student and creative writer.'),
('admin@college.edu', 'Editorial Team', 'admin', 'The College Periodical editorial team.');

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, author_id, category_id, status, featured, image_url, tags, views, likes, read_time, published_at) VALUES
(
    'The Future of Higher Education: Embracing Digital Transformation',
    'future-higher-education-digital-transformation',
    'How universities are adapting to the digital age and what it means for students and faculty.',
    'The landscape of higher education is rapidly evolving as institutions embrace digital transformation. From virtual classrooms to AI-powered learning platforms, universities are reimagining how education is delivered and consumed. This shift has profound implications for both students and faculty, creating new opportunities while also presenting unique challenges.

The COVID-19 pandemic accelerated this transformation, forcing institutions to quickly adapt to remote learning environments. What began as an emergency response has now become a permanent fixture in the educational landscape. Hybrid learning models, where students can choose between in-person and online attendance, are becoming the norm rather than the exception.

For students, this digital transformation offers unprecedented flexibility and access to resources. Online libraries, virtual office hours, and collaborative digital platforms have made learning more accessible than ever before. Students can now attend lectures from anywhere in the world, participate in virtual study groups, and access course materials 24/7.

However, this shift also presents challenges. The lack of face-to-face interaction can impact social development and networking opportunities that are crucial to the college experience. Faculty members are also adapting to new teaching methodologies, learning to engage students through screens and digital platforms.

As we look to the future, it''s clear that digital transformation in higher education is not just about technology—it''s about reimagining the entire educational experience to better serve the needs of modern learners.',
    1, 1, 'published', true, '/placeholder.svg?height=400&width=600', 
    ARRAY['education', 'technology', 'digital transformation', 'online learning'], 
    1250, 89, 8, '2024-03-15 10:00:00'
),
(
    'Student Mental Health: Breaking the Stigma',
    'student-mental-health-breaking-stigma',
    'A comprehensive look at mental health resources and support systems available on campus.',
    'Mental health has become a critical issue on college campuses across the nation. With increasing academic pressures, social challenges, and the uncertainty of post-graduation life, students are facing unprecedented levels of stress, anxiety, and depression.

The stigma surrounding mental health has long prevented students from seeking the help they need. Many fear judgment from peers, worry about academic consequences, or simply don''t know where to turn for support. However, colleges and universities are working hard to change this narrative.

Campus counseling centers have expanded their services, offering everything from individual therapy sessions to group workshops and peer support programs. Many institutions have also implemented mental health first aid training for staff and students, creating a network of support throughout the campus community.

Technology is also playing a role in mental health support. Apps for meditation, mood tracking, and crisis intervention are becoming more common, providing students with immediate access to resources when they need them most.

The key to breaking the stigma is open conversation and education. When students see their peers, faculty, and administrators talking openly about mental health, it normalizes the experience and encourages help-seeking behavior.

As we continue to prioritize mental health on campus, it''s important to remember that seeking help is a sign of strength, not weakness. Every student deserves access to the resources they need to thrive both academically and personally.',
    1, 2, 'published', true, '/placeholder.svg?height=300&width=500',
    ARRAY['mental health', 'counseling', 'student support', 'wellness'],
    890, 67, 6, '2024-03-12 14:30:00'
),
(
    'Campus Sustainability Initiatives: Going Green',
    'campus-sustainability-initiatives-going-green',
    'How our college is leading the way in environmental consciousness and sustainable practices.',
    'Sustainability has become more than just a buzzword on college campuses—it''s a way of life. Our institution is leading the charge in environmental consciousness, implementing innovative programs and practices that not only reduce our carbon footprint but also educate and inspire the next generation of environmental stewards.

From solar panels on dormitory rooftops to comprehensive recycling programs, our campus is transforming into a model of sustainability. The dining halls have partnered with local farms to source organic, locally-grown produce, reducing transportation emissions while supporting the local economy.

Student-led initiatives have been particularly impactful. The Environmental Club has organized campus-wide clean-up events, established community gardens, and launched awareness campaigns about sustainable living practices. These efforts have not only improved our campus environment but have also fostered a sense of community and shared responsibility among students.

The administration has also made significant commitments to sustainability. The recent pledge to achieve carbon neutrality by 2030 demonstrates the institution''s dedication to environmental responsibility. This ambitious goal will require continued innovation and collaboration across all departments.

Education plays a crucial role in our sustainability efforts. Environmental science courses now include hands-on projects that directly benefit the campus, while other departments have integrated sustainability concepts into their curricula. This interdisciplinary approach ensures that all students graduate with an understanding of environmental issues and their role in addressing them.',
    3, 6, 'published', false, '/placeholder.svg?height=300&width=500',
    ARRAY['sustainability', 'environment', 'green campus', 'climate change'],
    675, 45, 5, '2024-03-10 09:15:00'
);

-- Insert sample article submissions (pending review)
INSERT INTO article_submissions (title, author_name, author_email, category, excerpt, content, tags, status) VALUES
(
    'The Impact of AI on Student Learning',
    'John Smith',
    'john.smith@college.edu',
    'Technology',
    'Exploring how artificial intelligence is transforming the educational landscape and enhancing student learning experiences.',
    'Artificial Intelligence is revolutionizing education in ways we never imagined. From personalized learning platforms to automated grading systems, AI is making education more efficient and effective for both students and educators...',
    ARRAY['AI', 'education', 'technology', 'learning'],
    'pending'
),
(
    'Campus Food Security Initiative',
    'Maria Garcia',
    'maria.garcia@college.edu',
    'Health',
    'A look at new programs addressing food insecurity among students and promoting nutritional wellness on campus.',
    'Food insecurity affects more college students than many realize. Our campus has launched several initiatives to address this critical issue, including food pantries, meal assistance programs, and nutritional education workshops...',
    ARRAY['food security', 'student welfare', 'nutrition', 'campus programs'],
    'pending'
);

-- Insert sample comments
INSERT INTO comments (article_id, author_name, author_email, content, status) VALUES
(1, 'Emily Chen', 'emily.chen@college.edu', 'Great article! The points about hybrid learning really resonate with my experience this semester.', 'approved'),
(1, 'David Wilson', 'david.wilson@college.edu', 'I appreciate the balanced perspective on both benefits and challenges of digital transformation.', 'approved'),
(2, 'Lisa Park', 'lisa.park@college.edu', 'Thank you for addressing this important topic. The campus counseling center has been incredibly helpful.', 'approved');

-- Insert newsletter subscribers
INSERT INTO newsletter_subscribers (email) VALUES
('student1@college.edu'),
('student2@college.edu'),
('faculty@college.edu'),
('alumni@college.edu');
