import { NextRequest, NextResponse } from 'next/server';
import { getSpeciesForLocation } from '@/lib/inaturalist';
import { getMockSpeciesForMonth } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');
  const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1));
  const radius = parseInt(searchParams.get('radius') || '10');
  const limit = parseInt(searchParams.get('limit') || '50');
  const useMock = searchParams.get('mock') === 'true';

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: 'Invalid coordinates. Provide lat and lng.' },
      { status: 400 }
    );
  }

  if (month < 1 || month > 12) {
    return NextResponse.json(
      { error: 'Month must be between 1 and 12.' },
      { status: 400 }
    );
  }

  // Use mock data if requested or if API fails
  if (useMock) {
    const species = getMockSpeciesForMonth(month).slice(0, limit);
    return NextResponse.json({
      species,
      totalCount: species.length,
      location: { lat, lng },
      month,
      radius,
      isMock: true,
    });
  }

  try {
    const data = await getSpeciesForLocation(
      { lat, lng },
      month,
      radius,
      limit
    );

    return NextResponse.json({
      ...data,
      location: { lat, lng },
      month,
      radius,
    });
  } catch (error) {
    console.error('Species API error:', error);

    // Fallback to mock data on API failure
    const species = getMockSpeciesForMonth(month).slice(0, limit);
    return NextResponse.json({
      species,
      totalCount: species.length,
      location: { lat, lng },
      month,
      radius,
      isMock: true,
      warning: 'Using demo data - iNaturalist API unavailable',
    });
  }
}
