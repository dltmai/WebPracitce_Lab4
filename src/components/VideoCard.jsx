import React, { useRef, useEffect, useState } from "react";
import FooterLeft from "./FooterLeft";
import FooterRight from "./FooterRight";
import VideoInfo from "./VideoInfo";
import "./VideoCard.css";

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay,
    tags,
  } = props;

  const videoRef = useRef(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Pause all other videos when this one starts playing
      const handlePlay = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
          }
        });
      };

      const handlePause = () => {
      };

      // Create Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When video is 50% visible
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              video.play().catch(() => {
                console.log('Autoplay prevented');
              });
            } else {
              video.pause();
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the video is visible
        }
      );

      // Start observing the video element
      observer.observe(video);

      // Add event listeners
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      // Cleanup
      return () => {
        observer.unobserve(video);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [autoplay]);

  const handleMuteToggle = (isMuted) => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      // If unmuting, ensure this video is playing and others are paused
      if (!isMuted && videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  };

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleScroll = (e) => {
    if (e.deltaX > 0) {
      setShowInfo(true);
    }
    if (e.deltaX < 0) {
      setShowInfo(false);
    }
  };

  const videoData = {
    username,
    userAvatar: profilePic,
    description,
    tags,
  };


  const getVideoUrl = () => {
    if (videoRef.current) {
      return videoRef.current.src;
    }
    return "";
  };

  return (
    <div className="video" onWheel={handleScroll}>
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
            onMuteToggle={handleMuteToggle}
            getVideoUrl={getVideoUrl}
          />
        </div>
      </div>
      <VideoInfo isVisible={showInfo} videoData={videoData} />
    </div>
  );
};

export default VideoCard;
