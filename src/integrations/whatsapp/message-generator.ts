export function generateWhatsAppMessage(template: "consultation" | "project-inquiry" | "share" | "callback", params: Record<string, string>): string {
  const templates: Record<string, string> = {
    consultation: `Hi, I would like to schedule a consultation regarding ${params.projectType || "a project"}. My name is ${params.name}.`,
    "project-inquiry": `Hi, I am interested in the "${params.projectTitle}" project. I would like to know more about it.`,
    share: `Check out this project by PT Karya Nusantara Realty: ${params.projectTitle} - ${params.projectUrl}`,
    callback: `Hi, my name is ${params.name}. Please call me back at ${params.phone}.`,
  };

  return templates[template] || templates.consultation;
}

export function openWhatsApp(phoneNumber: string, message: string): void {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
