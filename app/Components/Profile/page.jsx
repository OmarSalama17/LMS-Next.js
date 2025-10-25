"use client";
import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage({setIsOpen}) {
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-[#00000078]"
      onClick={()=> setIsOpen(false)}>
      <div className="font-bold bg-white rounded-lg px-[10px] py-[5px] cursor-pointer"
      onClick={()=> setIsOpen(false)}>
        ✕
      </div>
      <div 
      onClick={(e) => e.stopPropagation()}
      >
      <UserProfile  routing="hash" />
      </div>
    </div>
  );
}