import { NextRequest, NextResponse } from 'next/server';
import { getRecentObservations } from '@/lib/inaturalist';
import { MOCK_OBSERVATIONS } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const lat = parseFloat(searchParams.get('lat') || '');
  const lng = parseFloat(searchParams.get('lng') || '');
  const radius = parseInt(searchParams.get('radius') || '5');
  const limit = parseInt(searchParams.get('limit') || '100');
  const monthParam = searchParams.get('month');
  const month = monthParam ? parseInt(monthParam) : undefined;

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { error: 'Invalid coordinates. Provide lat and lng.' },
      { status: 400 }
    );
  }

  if (month !== undefined && (month < 1 || month > 12)) {
    return NextResponse.json(
      { error: 'Month must be between 1 and 12.' },
      { status: 400 }
    );
  }

  try {
    const data = await getRecentObservations({ lat, lng }, radius, limit, month);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Observations API error:', error);

    // Fallback to mock data
    // Generate some mock observations around the given coordinates
    const mockObs = MOCK_OBSERVATIONS.map((obs, i) => ({
      ...obs,
      id: i + 1,
      lat: lat + (Math.random() - 0.5) * 0.05,
      lng: lng + (Math.random() - 0.5) * 0.05,
    }));

    return NextResponse.json({
      observations: mockObs,
      totalCount: mockObs.length,
      isMock: true,
    });
  }
}
