import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogContent } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const Unity = () => {
  const [open, setOpen] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const theme = useTheme();
  const navigate = useNavigate();

    // Retrieve the user's name and role from the cookies
    const nombre = Cookies.get('nombre');
    const role = Cookies.get('role');  

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "Build/UnityLoader.js";
    script.onload = () => {
    const unityShowBanner = (msg, type) => {
      const updateBannerVisibility = () => {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
      };
      const div = document.createElement('div');
      div.innerHTML = msg;
      warningBanner.appendChild(div);
      if (type === 'error') div.style = 'background: red; padding: 10px;';
      else {
        if (type === 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(() => {
          warningBanner.removeChild(div);
          updateBannerVisibility();
        }, 5000);
      }
      updateBannerVisibility();
    };

    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullscreenButton = document.querySelector("#unity-fullscreen-button");
    const warningBanner = document.querySelector("#unity-warning");

    const buildUrl = "Build";
    const loaderUrl = buildUrl + "/public.loader.js";
    const config = {
      dataUrl: buildUrl + "/public.data",
      frameworkUrl: buildUrl + "/public.framework.js",
      codeUrl: buildUrl + "/public.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "adivina quien unity",
      productVersion: "1.0",
      showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";
      canvas.className = "unity-mobile";
    } else {
      canvas.style.width = "960px";
      canvas.style.height = "600px";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      window.createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message) => {
        alert(message);
      });
    };

    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      // Cleanup code if needed
      window.removeEventListener('resize', handleWindowResize);
    };
    
    };
 
    document.body.appendChild(script);
  }, []);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  return (
    <div>
      <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleClickOpen}
        >
          Iniciar Sesión
        </Button>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
  <DialogContent>
    <html lang="en-us">
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Unity WebGL Player | adivina quien unity</title>
        <link rel="shortcut icon" href="TemplateData/favicon.ico" />
        <link rel="stylesheet" href="TemplateData/style.css" />
      </head>
      <body>
        <div id="unity-container" className="unity-desktop">
          <canvas id="unity-canvas" width={960} height={600} tabindex="-1"></canvas>
          <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
              <div id="unity-progress-bar-full"></div>
            </div>
          </div>
          <div id="unity-warning"> </div>
          <div id="unity-footer">
            <div id="unity-webgl-logo"></div>
            <div id="unity-fullscreen-button"></div>
            <div id="unity-build-title">adivina quien unity</div>
          </div>
        </div>
      </body>
    </html>
    </DialogContent>
  </Dialog>
 </div>
  );
};
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export default Unity;
