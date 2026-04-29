"use client";
import { categoryRegistry } from "../../../config/registry";
import QuestionnairePage from "../../questionnaire/page-client";

export default function PillowQuestionnairePage() {
  const config = categoryRegistry["pillow"];
  return (
    <QuestionnairePage
      questionnaire={config.questionnaire}
      resultsPath="/pillow/results"
    />
  );
}
