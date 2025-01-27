
import Image from 'next/image'
interface Data1Props {
    profileImage?: string;
    name: string;
    designation: string;
    nameStyle?: string;
    otherStyle?: string;
    
}

export default function Content({ profileImage, name, designation,nameStyle,otherStyle,}:Data1Props){

 
    return(
    <div className="flex items-center gap-[14px]">
      {profileImage && (
         <div><img src={profileImage} style={{width:'40px',height:'40px'}}></img></div>
      )}
       
        <div className="flex flex-col">

            <span className={`font-normal ${nameStyle}`} style={{color:'#333333'}}>{name}</span>
            {/* font size 18px removed */}
            <span className={`font-normal ${otherStyle}`} style={{color:'#6B7280'}}>{designation}</span> 
            {/* //text size 20px removed */}
        </div>
    </div>
            
    )
}