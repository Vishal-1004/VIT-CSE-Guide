import React from 'react';
import './Studymaterials.css'

const BlogCard = ({ author, date, tags, title, subtitle, imageUrl, readMoreLink }) => {
  return (
    <div className="blog-card">
      <div className="meta">
        <div className="photo" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        <ul className="details">
          <li className="author"><a href="#">{author}</a></li>
          <li className="date">{date}</li>
          <li className="tags">
            <ul>
              {tags.map((tag, index) => (
                <li key={index}><a href="#">{tag}</a></li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="description">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
        <p className="read-more">
          <a href={readMoreLink}>Read More</a>
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BlogCard
        author="John Doe"
        date="Aug. 24, 2015"
        tags={['Learn', 'Code', 'HTML', 'CSS']}
        title="Learning to Code"
        subtitle="Opening a door to the future"
        imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg"
        readMoreLink="#"
      />
      <BlogCard
        author="Jane Doe"
        date="July. 15, 2015"
        tags={['Learn', 'Code', 'JavaScript']}
        title="Mastering the Language"
        subtitle="Java is not the same as JavaScript"
        imageUrl="https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg"
        readMoreLink="#"
      />
    </div>
  );
};

export default App;
