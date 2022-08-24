import { styled } from "stitches.config";
import { ToastProvider, ToastViewport } from "./Toast";
import Card, { CardTypes } from "./Card";

//CardBox
const CardBox = styled("section", {
  display: "grid",
  boxSizing: "border-box",
  justifyItems: "center",
  alignItems: "center",
  gridGap: "32px",
  mx: "$3",
  "@bp3": {
    gridTemplateColumns: "1fr 1fr",
    gridGap: "24px",
    mx: "$4",
    px: "$8",
  },
});

const CardSectionTitle = styled("h3", {
  textAlign: "center",
});

export default function CardSection({
  submissions,
}: {
  submissions: CardTypes[];
}) {
  return (
    <>
      <CardSectionTitle>Latest Posts</CardSectionTitle>
      <CardBox>
        <ToastProvider duration={3000}>
          {submissions.map((submission) => {
            return <Card key={submission.id} {...submission} />;
          })}
          <ToastViewport />
        </ToastProvider>
      </CardBox>
    </>
  );
}
