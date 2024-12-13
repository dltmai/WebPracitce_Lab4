import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

// This array holds information about different videos
const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    // question 1
    profilePic:
      "data:image/jpeg;base64,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",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTExMWFhUVFRUXFxgXFxUXHRUYGBgYFxoXGhcYHSggGBolHRcXITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OFRAPFy0dFR0rLS0rKystKysrKy0rKystLS0tLS0tKy0rLS0tLS0rKzg3Ky0tKys3KysrKzcrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA+EAABAwIDBAkDAgUCBgMAAAABAAIRAyEEEjEFQVFhBgcTInGBkaHwscHRMuEUI0JS8WKSFjNDU3KCFRck/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACARAQADAAICAwEBAAAAAAAAAAABAhESUQMTITFBFDL/2gAMAwEAAhEDEQA/APJilBTUpXQLCWEidxtr428JM+soAG2+L+E2/ZCXkhRSgxaPngn0z7/PwmuZrvA36angj9vluSink8/3TXtRl3pWgi+nPwQMfrw+c00BON9d95RA1trp8vCKbCXL4evyU5rUrRx5eSKYlAV3B7NqVP0ttxIge+q2ML0XJgud6fkoOaASxzXb0OirBq2fOVdGwKYFqbfQe5U0edpwN16D/wDB0/8Att9AoqnR6kf+mPIR9E0xwbjPDfoEmVdjX6JtI7pc33+oWLjNg1Wad4DhY+iDHhClewixEJmVVcMIQ5PIRG9DEZQIjThe9vn2Un51+fLpuVQN0PqPsmwpG2M/W/qjKopsIAUhYI1veRHpBm+/h5o1JJ3oGgKRo5IaE8BFJlQnZUIKTHR5gi/PekKVzYm48t6AurgG6p+X5xTYTuUzdArQnQgD56QnR56JigD581QGm9t0f49E4H20T2t9Y8FMUwM0BtblvQRH+VPTZJFuHmdPNSfw+YWtwJ3xu9wmNYpNYd9uMXTXNEmNFaqUSAN8zcTugfdaeyNidp3nggbm6T48lkxn7O2c+qYaLbzeB+V1uyujrGxmBc7cT9huW1gcC1gtYDd9h6K82NJnwCiqdLBgHnzVoNaNw+qsHDH28E+ls8+XH9uKhiJjwNfz/hOyhymp4ZhsLkaqw7AGxGm9QZ72Dgoy4AWC0XYbdvTjhAbAH6oMptS9wUtXCgjT54K+/CRaL/N5UhbxG5DHK7Q2Mx+rR88dFy+0ejj2SadxwP2XptSiDYj2VCvgjcTfh+FdV5K5haYIghNhd5tvYbagnR24gexC46vhXMcWuF93DxV1VSEKXKkyqCMjSyGWIMAxuOh8VJlQWIYiypzLKQNS5eCLhjG+Xr9k9o/dKGp7G3UXDYQpQ1CGMkJYTmxw9Eon7L0PKaE4N+XRCUBMUsRx+ic1qGpWhFK0fPROASgJ7WosFaJt8lTsgfumNHyVe2Xhe0dO5uvPko6Qv7J2XmGdwsZgHfzW/hqOSTEn6JmEB4aaBa+Ge2YiZIXOVR4Fjnm8xzla7aTWCTA4T+OCkpsEiBrdZuOqd9xvqfRZTFypiWtGtyoqVY5pk3+aLO1hWsOdyYq6KhF906R9bLQwdbNIMct3wrO110V7Dac1CV/sQb70pYNPPd9vymU3R+rcdD4qHa+KcCGh26ZB9ETEOOpkXhQZ5jwsmNxbhqZUNSr3g5RcSUqneIOnH/KlfQkTu3Kw2kx0OaZ4q0KAGiowq+GDgZ1XM7Y2Q2oCNCNDGi7uvSF1k4ukLyL/AF80Hkdag5ji1wuPdMDF2vSHZIeMzR3hcc+S5DKq3EIsqUz7zwUxbwHDn9kZFGsQZU5zDYcreBv91MWJQxDEQECI1g6CfXUa/RKGKbKnsEXCmriDKhWS1IppjnwE6EsJy9vF8/SAJQE6OCdCcV00BPhK1qe1qcWitZrv4aD24RPsnlt/x8ugNUgHy30Ti1BA2dNV1Oz6AYzKBfeee9ZGyKEvLtzR7ldDh22k6zosTDpC3QZ84rSwzcrgTu/CqUGTf4FfbTXOYVdfW7vEneJt4KoaZ1O9TU2TEKV4Gh8lnFUxhRxjmnNaY8LK6xsajVSUsO0gEneR4JLWKRaTC0sE0gySL34Ie2nnEaLQ7AOFh6fLKMzArUzEjWyyMW0uMG3BbeGwbtSTA4LL2q2DbhrxUIhn5ElRllK1phOqsnkjWIMC4sfrY+66H+Iblvb5/hc+W8N3stDtwWwDprz0QmqxXZMRoZWVtNha2OJ18PnurmDxZzZZEDcreMotewiLozmOKqVYN9FzG3cDkqZgLOv5rrMVRVfa2Bz0RGoEj8KOsQ4oMShqm7NPFNTW+KANSlisCmnCmpMnFWDE9rVYdSixEeKe6jBgx5EH3Czq8VbIhWezQppxcoAlIUjWIAX1cfG5G5dLp4H03JQ1Pa1XGok0NTw1PY1SZeSY3EmBqe1qe1ilYzcpjpDa2Lh4a0xrf8ey2AwfhLQpimBa8CBy4nl88ZIv81XKW4WsFSkgcwterQyugyItBWdg3lumvFXmVM1iZWJhszwVilhiRPD3TcsfIV3D0iRACzLSNjdBF/m9O7PcORVz+EKmZhePBYlrVVmFLhBnjNhor2HwPdBm4i8bgVK1gCc6v6Dgob0H1i1seqy67Z0M/eVPU78RdQ1GFm6VCKoqmGDYDmwdw3+SdiMKwXBJG+dfJW6VN1Rw+uqfj8NIvIj38kX9c+GDcLqOpTi4V9tDSEVKJKjpjKGYEEahamExTtSABMSOCgNFS0m7joApqTAxuDY/vfTesrHUogRbd6LRdWLXQNCYg/k6KHE1A4W+fJUmUiJcHtDDZKjhFpn1VUU10G3aHfB4gj0P7rNFPksTL0RX4QMwzi0ugwCBPM7p8ijs+StNop4pLPJeKtTpwRaYOnFKKStikpBRUmyxVUfQc0wRBCFc7FCnJeLg8qXKpg1KGL7/ABfl4sja3d57/tvOic1qkDE9rFeLcWRhqlazcE9rFIxicXStjGsV/AUAHMLhMuGVvG+p/wBP1Pmq7WK9gyTVaTcyL+EQFmau8S6Ou2TOukpAzer4oSAVFTpHSFwdalo7loUhf5oq1OmVcwbL3WJh0XHUiR4K5gHSeG7gFNSpty+AUNJl9bfP3XORqUqQkQrOJpARdU6YMapHkrCfqptTatDDtDq9anTadC94bJ4CTc8goMJjKVdualUbUYbBzHBwMaiQvnbp9tOtiMZUNZzczD2eVhcWMygAtbmv+qZO8yper7aGNo4mcHS7Z+U5qVyHNloJIBFwct1lI8mS+nMFQAiABKtPoB4NtN6zNmVavZsdVaGVC0F7QZDXEXaDvgrXwxJ1UatM/aPD4SBoosVTOhHJaQKjqsnVGYtOuarUi2yi7AnQ/ZdE7CA6qlicMBoVmYdq3iWdSwMgnnAUFfDlgK2mN7sKLFUbaSstRb5c3VpFMZShaVSknU8ON6xrrsY5Xb1GzTz+37LI7FdVtqj3fMfdYvYrla3y7+P/ACpCgntpW18vurwpkCECksTZvFUUlI2irjKKe2kpNxSFBC0OwQs8h5nkShisCmnBpX63H4qLK+RPFM8PZWAzklFNXHSLIBTUjaalaxSBiY61lG1qs4MQ9v8A5D6pGMUrGLEw9FbO3wbZA8lDXo5Tb4FLs6oIHOFPiqUmV45+3piVRglWGGLhMpi6kylSXWGjRq89RopGHcqTBZWqJ0XOWlitimUqbqj3BrGtLnONsoGpPkvHelnW/iKrizBgUaYMB7g1z3RvhwIYOVzzWh12bfcxtPBNt2jRVqH+5uYhrP8Ac0k+Dea8fXK0uV7fkLL6zq1TNVqHM90ve7M4y43c6JJ48V9H9XHQSjgA+tSrdv2zW5andy5Ne6Wkggm88gvmddH0a6b4/ABzcPXLWOnuODXtB/uDXSGnmNd8rLETj6uNAHgfsq+0drYfCtz161Ok0D+t7Wz4AmSeQXzaOtbbEEfxeu/sqFvA5LKHYnRbaW2a5rEOdnLe0xFSzY/TINs8BsQ3gBZGpvr6h2XWdUpMqOABe0PAG5ru80TJBIaQCRYkGFZeFBg6Ypsaxtmsa1jRrZogX32CsAqH0Q6QqVbDSZWgSkc1JWtsZQZA0Tg4HVOxOsKOi4X8FydvzVSrhp3qu5kStCqbfVQOp2lYl0iZYG12SB4/lZnYra2k2SB4lUxSXlvPy9lP8qXYpwoq4KSc2ksa2qCipRSVptJSNpIKnYoWgKSEZ15R2aUU1bFJKKS/Ya/EKzaad2asdmnBicnWFcU04MVgNS5E11qgDVI1qkDU5oUmXoo6DYFSWgb229LhbOGpnvTpMjzXL7HrZXxud9V1mHdZeTyRkvTWVSrQIKe0H5vWhUotc3mmGnpxhcpl2rKGi0qakYVigwAyElWkJgTpI5lYmW3lvXrs1rmUMXmAeD2BH9ze89pB/wBJz/7gvH17X120f/xUXTpiAI4TTf8AheKLlLjeMkoKJlIt3oh0ZrbQrilTENEGpUItTbxPFxvDd55SRGWGvpDqp6f0sbTbhnNZRr0mQ1jBlZUY200x/SQNW+YtpH0j6rsLi8NTp0YoVqLAym+JD2j+moBd0mTm1BJ10Xjm3eiW0dlVW1KjHMyOBZXpEuZmEQQ8fpM7nAHkjWTWX1dHFOLl4v0d68afY5cbQearQO9RDSKnMtcRkPmR4aLpMJ1y7KcBmdWZpZ1ImJEn9Bdpoouw9ElGZc10R6bYTaZrDDF/8ktDs7csh05XNubHKdYNtF0gUVDVYoDTG5W3FQuCxZ0rKBzFDVFlaIVLGOgFcrzkOtI2WRiBLio+zVkMS5F45l7o+EAppwpKwGJ7aayartpKRtNWBTUgpqszZX7JCuBiRVjk+c3dNASYYQLRzOl/WfJM/wCNnBv/ACwXcZPwrjUL7fuv2+H6PH07X/jjT+V4yeWgjmkwnTcye0YIgRGsz+FxaE91+19NOnanpnYw282H/sXa+BjyS1OnBAEUwTabmOfzxXEoV99+19VOncnpyLRT4zJ9AI+XS0em4/qZwm/qdPkLhUJ779r66u+f03p3ytIgW5mPa62KPWuxrRNAudae8AI3wY1j66rylClvLaftqIx7J/8AbtAQBQebXMgSZ0A4b9dyrjrfbnE0CWXm4m+kDQ6DhqV5GhY5S1r2Gt1vsh+Sk8GXZJjQhoBnc4EE7x3uSy8d1u13RlpNtGsxreOFo46leZJVNleUu16XdYD8dhxQNFrACHE5iTmB19CR5lcShCiTOnNib6Lvei/WL/BtFKnh2to94nKZe5x0c5x/U6w8rCwhcAhCJmPp62euN0vIpOE5ssEb2tAm9iC2ZH9xTcX1113MgUKZcRBzSWndBbPeEE+NrBeTIQm0ysY/ECpUc8MazMZysENHgNwULQN6ahEep9GOs+ls+mKGHw/8oCTnID3vknO4t36WvYQIha2G69nS7tMKIk5Q126LBxPAxccSvFkJi69erdeFckZcOwfpzd46gy6PEWV7FdddNzm5aLwIIJsblzSLTcQ2OPePn4mhZ4wvKXszOuwiZoZhm7t4MTv8t3uqzeucuac+H714yutJNiZvYT8NvIkKT46z9tV8tq/UvXKfW/cTQAFp7xN9Tu03e6uDrgoZB/JeHyJFiIved82svGEix/P4+m/6PJ29ob1wUWuM0XObaCIBNgCIPOTqnUuuejlJdhnh39LQ4Qb2l0Wty3LxVCfz+PpPfft7TW65aZ/TRLbH9RmTYbtOPlCV/XNSIZ/Je03zxBDZYR3eMOOa/wDavFUK+inSe6/b1zFdcLi4ljHBtouBuE2LTvSryJCvpp0z7LdhCELowEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQg//Z",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic:
      "data:image/jpeg;base64,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",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpdV5eKcBMzjs7ltDev4YxvWvnNxcFk7wUg&s",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]); // Mảng video hiển thị
  const [filteredVideos, setFilteredVideos] = useState([]); // Mảng video đã lọc
  const videoRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState(""); // Giá trị tìm kiếm
  // question 3
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const DRAG_THRESHOLD = 100;

  useEffect(() => {
    setVideos(videoUrls); // Gán danh sách video ban đầu
    setFilteredVideos(videoUrls); // Ban đầu hiển thị tất cả video
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = videos.filter((video) =>
      video.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const scrollToVideo = (index) => {
    if (containerRef.current) {
      const videoElement = containerRef.current.children[index];
      if (videoElement) {
        videoElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentY = e.clientY;
    const deltaY = startY - currentY;

    if (Math.abs(deltaY) > DRAG_THRESHOLD) {
      if (deltaY > 0 && currentIndex < filteredVideos.length - 1) {
        // Kéo lên - video tiếp theo
        setCurrentIndex((prev) => prev + 1);
        scrollToVideo(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        // Kéo xuống - video trước
        setCurrentIndex((prev) => prev - 1);
        scrollToVideo(currentIndex - 1);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Xử lý play/pause video khi cuộn màn hình
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(containerRef.current.children).indexOf(
            entry.target
          );
          setCurrentIndex(index);
          entry.target.querySelector("video")?.play();
        } else {
          entry.target.querySelector("video")?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    if (containerRef.current) {
      Array.from(containerRef.current.children).forEach((child) => {
        observer.observe(child);
      });
    }

    return () => observer.disconnect();
  }, [filteredVideos]); // Lắng nghe danh sách video đã lọc

  // Gán tham chiếu (ref) cho từng video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div
      className="app"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        ref={containerRef}
        className="container"
        style={{
          scrollSnapType: "y mandatory",
          overflowY: "scroll",
        }}
      >
        <TopNavbar className="top-navbar" onSearch={handleSearch} />
        {/* Hiển thị danh sách video đã lọc */}
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === currentIndex}
              style={{ scrollSnapAlign: "start" }}
            />
          ))
        ) : (
          <p>No videos found</p>
        )}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
