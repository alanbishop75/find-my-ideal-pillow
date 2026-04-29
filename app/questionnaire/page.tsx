import { redirect } from 'next/navigation';

// Redirect legacy /questionnaire to the pillow questionnaire route
export default function QuestionnairePage() {
  redirect('/pillow/questionnaire');
}
