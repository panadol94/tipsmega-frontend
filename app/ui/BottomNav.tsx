"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, CircleHelp, UserRound } from "lucide-react";
import { useGlobalSettings } from "../context/GlobalSettingsContext";
export default function BottomNav({isBusy}: {isBusy?: boolean}) {
 const pathname=usePathname(); const {scanActive}=useGlobalSettings();
 const items=[{label:"Utama",href:"/",icon:Home},{label:"Panduan",href:"/mega888",icon:BookOpen},{label:"Bantuan",href:"/help",icon:CircleHelp},{label:"Akaun",href:"/profile",icon:UserRound}];
 return <nav className="sport-bottom-nav" aria-label="Navigasi utama">{items.map(({label,href,icon:Icon})=> <Link key={href} href={href} aria-current={pathname===href?"page":undefined} aria-disabled={isBusy||scanActive} onClick={e=>{if(isBusy||scanActive)e.preventDefault();}}><Icon size={21}/><span>{label}</span></Link>)}</nav>;
}
