import React, {useRef} from "react";
import useFullscreenStatus from "./util";

export default function MaximizeContent({ children, backgroundColor='darkgrey' }) {
  const maximizeElement = useRef(null);
  let isFullscreen, setIsFullscreen;
  let errorMessage;

  try {
    [isFullscreen, setIsFullscreen] = useFullscreenStatus(maximizeElement);
  } catch (e) {
    errorMessage = "Fullscreen not supported";
    isFullscreen = false;
    setIsFullscreen = undefined;
  } 

  const handleExitFullscreen = () => document.exitFullscreen();

  return (
    <div ref={maximizeElement} style={{ backgroundColor: isFullscreen ? backgroundColor : null }}>     
      <div onMouseOver={setIsFullscreen}>
          
          {children}</div>
        {errorMessage ? (
                <button className="btn"
                    onClick={() =>
                    alert(
                        "Fullscreen is unsupported by this browser, please try another browser."
                    )}>
                    {errorMessage}
                </button>
                ) : isFullscreen ? (
                    <div className="row">
                <button 
                  style={{marginLeft: '40em', marginTop: '-3em', color: 'black'}}
                  className="paper-btn btn-primary text-black" onClick={handleExitFullscreen}>Exit</button>
                </div>
                ): ([])
                }
      </div>
  );
}