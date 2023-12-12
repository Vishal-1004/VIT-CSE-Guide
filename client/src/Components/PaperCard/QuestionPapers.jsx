import React from 'react';
import "./QuestionPaper.css"

const Card = ({ imageUrl, category, title, author }) => {
  return (
    <div className="card">
      <a href="#">
        <img src={imageUrl} alt="mountains" style={{ width: '100%' }} />
        <div className="container">
          <a className="category" href="#">
            {category}
          </a>
          <h2>
            <b>{title}</b>
          </h2>
          <p>
            By <a className="author" href="#">
              {author}
            </a>
          </p>
        </div>
      </a>
    </div>
  );
};

const App = () => {
  const cardsData = [
    {
      imageUrl: 'https://static.pexels.com/photos/1562/italian-landscape-mountains-nature-large.jpg',
      category: 'TRAVEL',
      title: 'Into the Mountains',
      author: 'Ewa Bilska',
    },
    // Add more card data as needed
  ];

  return (
    <div>
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default App;
