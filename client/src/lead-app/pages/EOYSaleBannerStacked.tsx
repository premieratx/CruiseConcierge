import { EOYSaleBannerStacked as StackedBanner } from "@/lead-app/components/quote-builder/EOYSaleBannerStacked";
import { EOYSaleBannerVisual } from "@/lead-app/components/quote-builder/EOYSaleBannerVisual";

// Import images for photo strip
import cleverGirl1 from "@/lead-app/assets/boats/clever-girl-1.jpg";
import cleverGirl3 from "@/lead-app/assets/boats/clever-girl-3.jpg";
import cleverGirl4 from "@/lead-app/assets/boats/clever-girl-4.jpg";
import cleverGirl6 from "@/lead-app/assets/boats/clever-girl-6.jpg";
import cleverGirl9 from "@/lead-app/assets/boats/clever-girl-9.jpg";
import irony1 from "@/lead-app/assets/boats/irony-1.jpg";
import irony3 from "@/lead-app/assets/boats/irony-3.jpg";
import irony5 from "@/lead-app/assets/boats/irony-5.jpg";
import meeseeks1 from "@/lead-app/assets/boats/meeseeks-1.jpg";
import meeseeks3 from "@/lead-app/assets/boats/meeseeks-3.jpg";
import meeseeks5 from "@/lead-app/assets/boats/meeseeks-5.jpg";
import discoFun27 from "@/lead-app/assets/party/disco_fun_27.jpg";
import discoFun28 from "@/lead-app/assets/party/disco_fun_28.jpg";
import discoFun29 from "@/lead-app/assets/party/disco_fun29.jpg";
import discoFunBest2 from "@/lead-app/assets/party/disco_fun_best2.jpg";
import discoFunFirst from "@/lead-app/assets/party/disco_fun_first.jpg";
import discoWigs from "@/lead-app/assets/party/disco_wigs.jpg";
import djPic from "@/lead-app/assets/party/DJ_Pic.jpg";
import groupPic from "@/lead-app/assets/party/Group_Pic_6_22.jpg";
import boatPic from "@/lead-app/assets/party/IMG_7635.jpg";
import unicornPic from "@/lead-app/assets/party/unicorn_pic.jpg";

const PhotoStrip = ({ images }: { images: string[] }) => {
  const imageWidth = 68;
  const totalWidth = images.length * imageWidth;
  
  return (
    <div className="h-10 overflow-hidden relative w-full">
      <div 
        className="flex gap-1 absolute left-0"
        style={{
          animation: `scroll-seamless 40s linear infinite`,
          width: `${totalWidth * 2}px`
        }}
      >
        {images.map((img, idx) => (
          <img 
            key={`a-${idx}`} 
            src={img} 
            alt="" 
            className="h-10 w-16 object-cover rounded-sm opacity-70 flex-shrink-0"
          />
        ))}
        {images.map((img, idx) => (
          <img 
            key={`b-${idx}`} 
            src={img} 
            alt="" 
            className="h-10 w-16 object-cover rounded-sm opacity-70 flex-shrink-0"
          />
        ))}
      </div>
      <style>{`
        @keyframes scroll-seamless {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `}</style>
    </div>
  );
};

const EOYSaleBannerStackedPage = () => {
  const bottomImages = [
    cleverGirl1, discoFun27, irony1, discoFunBest2, meeseeks1, groupPic,
    cleverGirl3, discoFun28, irony3, discoWigs, meeseeks3, djPic,
    cleverGirl4, discoFun29, irony5, discoFunFirst, meeseeks5, boatPic,
    cleverGirl6, unicornPic, cleverGirl9
  ];

  return (
    <div className="w-full">
      {/* Visual Version with Photos - TOP */}
      <EOYSaleBannerVisual />
      <PhotoStrip images={bottomImages} />
      
      {/* 200px spacing */}
      <div className="h-[200px]" />
      
      {/* Original Stacked Version - BOTTOM */}
      <StackedBanner />
      <PhotoStrip images={bottomImages} />
    </div>
  );
};

export default EOYSaleBannerStackedPage;
