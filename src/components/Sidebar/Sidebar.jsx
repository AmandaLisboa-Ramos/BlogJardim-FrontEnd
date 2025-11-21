import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot";

export default function Sidebar({ isDarkMode, isOpen, onClose }) {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${isDarkMode ? styles.dark : ""} ${isOpen ? styles.open : ""}`}>
        <h3 className={styles.title}></h3>

        <nav className={styles.menu}>
          <Link to="/" className={styles.link} onClick={handleLinkClick}>Todos os Posts</Link>
          <Link to="/create-post" className={styles.newPostButton} onClick={handleLinkClick}>+ Novo Post</Link>
          <Link to="/profile" className={styles.link} onClick={handleLinkClick}>Meu Perfil</Link>
          <Chatbot isDarkMode={isDarkMode} />
        </nav>
      </aside>
    </>
  );
}
