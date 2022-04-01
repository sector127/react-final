import { useState } from 'react';
import { Greeting } from '../../components/Greeting';
import { Welcome } from '../../components/Welcome';
const HomeContent = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const renderContent = () => {
    let content;
    if (showWelcome) {
      content = <Greeting title="Royal" subTitle="highness" />;
    } else content = <Welcome name="John" surName="Doe" />;
    return content;
  };
  const handleClick = () => {
    setShowWelcome(!showWelcome);
  };

  return (
    <div>
      <button className="btn btn-outline-primary" onClick={handleClick}>
        კონტენტის შეცვლა
      </button>
      <hr />
      {renderContent()}
    </div>
  );
};

export default HomeContent;
