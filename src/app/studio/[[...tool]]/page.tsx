import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./studio-lazy"));

export default function StudioPage() {
  return <Studio />;
}
