"use client";
import { categoryRegistry } from "../../../config/registry";
import ResultsPageClient from "../../results/page-client";

export default function PillowResultsPage() {
  const config = categoryRegistry["pillow"];
  return (
    <ResultsPageClient
      products={config.products}
      scoringEngine={config.scoringEngine}
      resultsHeading={config.meta.resultsHeading}
      homeHref="/"
      questionnaireHref="/pillow/questionnaire"
    />
  );
}
