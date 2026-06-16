"use client";
import { categoryRegistry } from "../../../config/registry";
import QuestionnairePage from "../../questionnaire/page-client";
import { Header } from "../../../components/Header";

export default function PillowQuestionnairePage() {
  const config = categoryRegistry["pillow"];
  return (
    <>
      <Header />
      <QuestionnairePage
        questionnaire={config.questionnaire}
        resultsPath="/pillow/results"
      />
    </>
  );
}
