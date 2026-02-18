import CommentsList from "@/components/comment/CommentsList";
import Section from "@/layout/Section";
import LinkButton from "@/ui/LinkButton";
import { PiChatCenteredDotsDuotone } from "react-icons/pi";

const comments = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  comment:
    "بهترین تولیدی که تابه حال دیدم بود, هر محصولی ازشون خریدم بهترین کیفیت رو داشت. حتما ازشون خرید کنید...",
  rate: Math.floor(Math.random() * 5) || 1,
  user: {
    name: "علیرضا عابدی",
    cover: "/images/default-user.jpg",
  },
}));

async function Page() {
  return (
    <div>
      <Section
        title="نظرات تولیدی"
        icon={<PiChatCenteredDotsDuotone />}
        hasViewMore={false}
      >
        <div className="container flex gap-5 flex-col items-center">
          <CommentsList comments={comments} />
          <LinkButton>مشاهده بیشتر</LinkButton>
        </div>
      </Section>
    </div>
  );
}

export default Page;
