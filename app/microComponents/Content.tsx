
import Image from 'next/image'
export interface Data1Props {
    profileImage?: string;
    name: string;
    designation: string;
    nameStyle?: string;
    otherStyle?: string;
    imageHeight?: string;  
    imageWidth?: string; 
    children?:string;
    
}

export default function Content({ profileImage, name, designation,nameStyle,otherStyle,imageHeight,imageWidth,children}:Data1Props){

 
    return(
    <div className="flex items-center gap-[14px]">
      {profileImage && (
         <div><img src={profileImage} style={{width:imageWidth,height:imageHeight}}></img></div>
      )}
       
        <div className="flex flex-col">

            <span className={`font-normal ${nameStyle}`} style={{color:'#333333'}}>{name}</span>
            <>{children}</>
            {/* font size 18px removed */}
            <span className={`font-normal ${otherStyle}`} style={{color:'#6B7280'}}>{designation}</span> 
            {/* //text size 20px removed */}
        </div>
    </div>
            
    )
}