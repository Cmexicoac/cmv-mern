import React, { useRef, useEffect } from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import "./TemplateData/style.css";

function Juego() {
  const canvasRef = useRef(null);
  const loadingBarRef = useRef(null);
  const progressBarFullRef = useRef(null);
  const fullscreenButtonRef = useRef(null);

  const {unityProvider} = useUnityContext({
    loaderUrl: "Build/public.loader.js",
    dataUrl: "Build/public.data",
    frameworkUrl: "Build/public.framework.js",
    codeUrl: "Build/public.wasm",
  });

  useEffect(() => {
    var canvas = canvasRef.current;
    var loadingBar = loadingBarRef.current;
    var progressBarFull = progressBarFullRef.current;
    var fullscreenButton = fullscreenButtonRef.current;

    // You can now use these variables in your code
    // ...
  }, []);

  return (
    <div id="unity-container" className="unity-desktop">
      <canvas id="unity-canvas" width="920" height="400" tabIndex="-1" ref={canvasRef}></canvas>
      <div id="unity-loading-bar" ref={loadingBarRef}>
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full" ref={progressBarFullRef}></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button" ref={fullscreenButtonRef}></div>
        <div id="unity-build-title">Adivina Quien Unity</div>
      </div>
      <Unity unityProvider={unityProvider} />
    </div>
  );
}

export default Juego;