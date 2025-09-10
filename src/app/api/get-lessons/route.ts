
import { NextResponse } from 'next/server';
import sampleContent from '@/data/sample-content.json';
import type { Lesson } from '@/lib/types';

export async function GET() {
  try {
    // Return the lessons from the local JSON file
    const lessons: Lesson[] = sampleContent.lessons;
    return NextResponse.json({ lessons });
  } catch (error) {
    console.error("Failed to read sample content file:", error);
    return NextResponse.json({ error: 'Failed to load lesson data.' }, { status: 500 });
  }
}
