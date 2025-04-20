import "./Liens.scss";
import avatar from "./assets/avatar.png";
import IconCard from "@/components/iconCard/IconCard";

// Réseaux sociaux
import FacebookLogo from "@/assets/icons/facebook.svg";
import TwitterLogo from "@/assets/icons/x.svg";
import LinkedinLogo from "@/assets/icons/linkedin.svg";
import RedditLogo from "@/assets/icons/reddit.svg";
import TelegramLogo from "@/assets/icons/telegram.svg";
import DiscordLogo from "@/assets/icons/discord.svg";
import MediumLogo from "@/assets/icons/medium.svg";
import GithubLogo from "@/assets/icons/github.svg";
import GmailLogo from "@/assets/icons/gmail.svg";
import YoutubeLogo from "@/assets/icons/youtube.svg";
import SlackLogo from "@/assets/icons/slack.svg";

// Services
import NotionLogo from "@/assets/icons/notion.svg";
import FigmaLogo from "@/assets/icons/figma.svg";
import ClickupLogo from "@/assets/icons/clickup.svg";
import TodoistLogo from "@/assets/icons/todoist.svg";
import AirtableLogo from "@/assets/icons/airtable.svg";
import PocketLogo from "@/assets/icons/pocket.svg";
import MiroLogo from "@/assets/icons/miro.svg";
import GDriveLogo from "@/assets/icons/google-drive.svg";
import OneDriveLogo from "@/assets/icons/onedrive.svg";

const socialLinks = [
  { icon: GmailLogo, label: "Gmail", href: "https://mail.google.com/mail/" },
  { icon: YoutubeLogo, label: "Youtube", href: "https://www.youtube.com/" },
  { icon: SlackLogo, label: "Slack", href: "https://slack.com/" },
  { icon: FacebookLogo, label: "Facebook", href: "https://facebook.com/" },
  { icon: TwitterLogo, label: "X", href: "https://x.com/" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "https://linkedin.com/" },
  { icon: GithubLogo, label: "GitHub", href: "https://github.com/" },
  { icon: RedditLogo, label: "Reddit", href: "https://reddit.com/" },
  { icon: MediumLogo, label: "Medium", href: "https://medium.com/" },
  { icon: TelegramLogo, label: "Telegram", href: "https://t.me/" },
  { icon: DiscordLogo, label: "Discord", href: "https://discord.com/channels/@me" },
];

const serviceLinks = [
  { icon: NotionLogo, label: "Notion", href: "https://www.notion.so/" },
  { icon: FigmaLogo, label: "Figma", href: "https://figma.com/" },
  { icon: ClickupLogo, label: "ClickUp", href: "https://app.clickup.com/" },
  { icon: TodoistLogo, label: "Todoist", href: "https://todoist.com/" },
  { icon: AirtableLogo, label: "Airtable", href: "https://airtable.com/" },
  { icon: PocketLogo, label: "Pocket", href: "https://getpocket.com/" },
  { icon: MiroLogo, label: "Miro", href: "https://miro.com/" },
  { icon: GDriveLogo, label: "Google Drive", href: "https://drive.google.com/" },
  { icon: OneDriveLogo, label: "OneDrive", href: "https://onedrive.live.com/" },
];

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="header">
        <img src={avatar} alt="Avatar" className="avatar" />
        <h1>🌐 Mes Liens</h1>
        <p>Mes profils publics & services connectés</p>
      </div>

      <div className="section social">
        <h2>Réseaux sociaux</h2>
        <div className="link-grid">
          {socialLinks.map((link, index) => (
            <IconCard key={index} {...link} />
          ))}
        </div>
      </div>

      <div className="separator" />

      <div className="section services">
        <h2>Services connectés</h2>
        <div className="link-grid">
          {serviceLinks.map((link, index) => (
            <IconCard key={index} {...link} />
          ))}
        </div>
      </div>
    </section>
  );
}
