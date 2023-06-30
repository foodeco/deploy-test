import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const Donguk = "https://github.com/foodeco";
  const Haeun = "https://github.com/hahahaday12";
  const Saeyeon = "https://github.com/saeyeonKim";
  const Daehyun = "https://github.com/dhmoon11";
  const Jinyoung = "https://github.com/jinyoungpark231";
  const Twinkle = "https://github.com/KDT5TeamWink";

  return (
    <footer>
      <div className="Footer-inner">
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            size="2x"
            onClick={() => {
              window.open(Twinkle);
            }}
          />
          <p>Twinkle</p>
        </div>
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            size="2x"
            onClick={() => {
              window.open(Donguk);
            }}
          />
          <p>서동욱</p>
        </div>
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            size="2x"
            onClick={() => {
              window.open(Haeun);
            }}
          />
          <p>김하은</p>
        </div>
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            size="2x"
            onClick={() => {
              window.open(Saeyeon);
            }}
          />
          <p>김세연</p>
        </div>
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            size="2x"
            onClick={() => {
              window.open(Daehyun);
            }}
          />
          <p>문대현</p>
        </div>
        <div className="wrap">
          <FontAwesomeIcon icon={faGithub} 
            className="BsGithub"
            size="2x"
            onClick={() => {
              window.open(Jinyoung);
            }}
          />
          <p>박진영</p>
        </div>
      </div>
      <div className="Logo-box">
        <img src="/images/Wink_logo.png" alt="logo_image"/>
      </div>
        <p className="title">toyproject ©️ 5기 7조 twinkle</p>  
    </footer>
  );
};
export default Footer;