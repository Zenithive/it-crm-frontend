
import Image from 'next/image'
interface Data1Props {
    profileImage: string;
    name: string;
    designation: string;
}

export default function Content({ profileImage, name, designation }:Data1Props){

 
    return(<>
    
    <div className="gap-[14px] flex items-center">
        <div><img src={profileImage} style={{width:'40px',height:'40px'}}></img></div>
        <div className="flex flex-col">

            <span className="font-normal text-[18px] " style={{color:'#333333'}}>{name}</span>
            <span className="font-normal text-[20px]" style={{color:'#6B7280'}}>{designation}</span>
        </div>
    </div>
    
    
{/* <div className="">
            <span className="font-normal text-[18px] " style={{color:'#333333'}}>{name}</span>
            <span className="font-normal text-[20px]" style={{color:'#6B7280'}}>{designation}</span>
    </div> */}
        
    
    </>)
}