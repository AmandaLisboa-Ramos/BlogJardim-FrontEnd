import { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./MainLayout.module.css";


export default function MainLayout({ isDarkMode, toggleDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className={`${styles.layout} ${isDarkMode ? styles.dark : ""}`}>
      <Header 
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleSidebar={toggleSidebar}
      />
      
      <div className={styles.contentArea}>
        {sidebarOpen && (
          <div className={styles.overlay} onClick={closeSidebar}></div>
        )}
        <Sidebar 
          isDarkMode={isDarkMode} 
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />
        
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}