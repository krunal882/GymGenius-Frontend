<template>
    <div class="ads-container">
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-format="autorelaxed"
           data-ad-client="ca-pub-7764190062746470"
           data-ad-slot="4174778919"></ins>
    </div>
  </template>
  
  <script>
  export default {
    name: "GoogleAd",
    mounted() {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      } else {
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7764190062746470";
        adScript.crossOrigin = "anonymous";
        document.head.appendChild(adScript);
  
        adScript.onload = () => {
          window.adsbygoogle = window.adsbygoogle || [];
          window.adsbygoogle.push({});
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .ads-container {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  
