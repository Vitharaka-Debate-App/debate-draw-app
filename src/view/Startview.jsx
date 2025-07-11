import React, { useRef, useState, useEffect } from "react";

function StartView({ onStartGame }) {
  const [showVideo, setShowVideo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartClick = () => {
    setShowVideo(true);
    const playPromise = videoRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Video play failed:", error);
        handleVideoEnd();
      });
    }
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    onStartGame();
  };

  // Modern dark theme styles with animations
  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
        flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
      zIndex: 1000,
      transition: 'opacity 0.5s ease',
      opacity: isVisible ? 1 : 0
    },
    content: {
      textAlign: 'center',
      padding: '2.5rem',
      backgroundColor: '#1e1e1e',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      maxWidth: '500px',
      width: '90%',
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    image: {
      maxWidth: '200px',
      marginBottom: '1.5rem',
      filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
      transform: isVisible ? 'scale(1)' : 'scale(0.9)',
      transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
      transitionDelay: '0.1s',
        borderRadius: '8px',
    },
    title: {
      fontSize: '2.2rem',
      color: '#ffffff',
      marginBottom: '1rem',
      fontWeight: '600',
      background: 'linear-gradient(90deg, #6ee7b7, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      transitionDelay: '0.2s'
    },
    description: {
      fontSize: '1.1rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '2.5rem',
      lineHeight: '1.6',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      transitionDelay: '0.3s'
    },
    button: {
      backgroundColor: '#111827',
      color: 'white',
      border: 'none',
      padding: '14px 32px',
      fontSize: '1.1rem',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: '500',
      letterSpacing: '0.5px',
      boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
    //   transitionDelay: '0.1s',
      ':hover': {
        backgroundColor: '#2563eb',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
      },
      ':active': {
        transform: 'translateY(0)'
      }
    },
    videoContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      zIndex: 1001,
      opacity: showVideo ? 1 : 0,
      transition: 'opacity 0.5s ease'
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: showVideo ? 1 : 0,
      transition: 'opacity 0.5s ease'
    },
    logolist: {
      display: 'flex',

    },
    singallogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '150px',   // 2:1 ratio width
        height: '50px',  // 2:1 ratio height
        overflow: 'hidden',
        borderRadius: '8px',
        margin: '30px auto',
        gap: '5rem',

    //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    },
    logolist: {
      display: 'flex',
      gap: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
    },
  };

  return (
    <>
      {!showVideo ? (
        <div style={styles.container}>
          <div style={styles.content}>
            <img 
              src="/vitharka-logo.jpg"
              alt="Game Logo" 
              style={styles.image}
            />
            {/* <div style={styles.logolist}>
                <div style={styles.singallogo}><img src="/sltcw.png" alt="" width="100px" position="center"/></div>
                <div style={styles.singallogo}><img src="/vitharka.png" alt="" width="100px" paddingbottom="10px"/></div>
                <div style={styles.singallogo}><img src="/mediaw.png" alt="" width="100px" position="center"/></div>
            </div> */}
            <h1 style={styles.title}>Preliminary Round</h1>
            <p style={styles.description}>
              All teams face random opponents debating impromptu topics with 20 minutes preparation time.
            </p>
            <button 
              style={styles.button}
              onClick={handleStartClick}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#5b21b6';//111827
                // e.currentTarget.style.border = '1px solid #3b82f6'; // Blue border
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#111827';//5b21b6
                // e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.border = '1px solid #3b82f6'; // Blue border
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Now
            </button>
          </div>
            <div style={styles.logolist}>
                <div style={styles.singallogo}><img src="/sltcw.png" alt="" width="100px" position="center"/></div>
                <div style={styles.singallogo}><img src="/vitharka.png" alt="" width="100px" paddingbottom="10px"/></div>
                <div style={styles.singallogo}><img src="/mediaw.png" alt="" width="100px" position="center"/></div>
            </div>
        </div>
      ) : (
        <div style={styles.videoContainer}>
          <video
            ref={videoRef}
            style={styles.video}
            onEnded={handleVideoEnd}
            muted
            autoPlay
            playsInline
          >
            <source src="/vitharka-intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      )}
    </>
  );
}

export default StartView;