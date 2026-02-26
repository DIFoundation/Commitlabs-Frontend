import { describe, it, expect, vi } from 'vitest'
import { GET, POST } from '@/app/api/commitments/route'
import { createMockRequest, parseResponse } from './helpers'

describe('GET /api/commitments', () => {
  it('should return a list of commitments with default parameters', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments'
    )
    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data).toHaveProperty('data')
    expect(result.data).toHaveProperty('total')
    expect(result.data).toHaveProperty('limit')
    expect(result.data).toHaveProperty('offset')
    expect(Array.isArray(result.data.data)).toBe(true)
  })

  it('should return commitments filtered by status', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments?status=active'
    )
    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.data).toBeInstanceOf(Array)
    // All returned commitments should have the requested status
    result.data.data.forEach((commitment: any) => {
      expect(commitment.status).toBe('active')
    })
  })

  it('should support pagination with limit and offset', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments?limit=5&offset=0'
    )
    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(200)
    expect(result.data.limit).toBe(5)
    expect(result.data.offset).toBe(0)
    expect(result.data.data.length).toBeLessThanOrEqual(5)
  })

  it('should return commitment objects with required fields', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments'
    )
    const response = await GET(request)
    const result = await parseResponse(response)

    expect(result.data.data.length).toBeGreaterThan(0)

    result.data.data.forEach((commitment: any) => {
      expect(commitment).toHaveProperty('id')
      expect(commitment).toHaveProperty('title')
      expect(commitment).toHaveProperty('amount')
      expect(commitment).toHaveProperty('status')
      expect(commitment).toHaveProperty('createdAt')
    })
  })
})

describe('POST /api/commitments', () => {
  it('should create a new commitment with valid data', async () => {
    const commitmentData = {
      title: 'Test Commitment',
      amount: 1000,
    }

    const request = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: commitmentData,
      }
    )

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(201)
    expect(result.data).toHaveProperty('id')
    expect(result.data).toHaveProperty('title', commitmentData.title)
    expect(result.data).toHaveProperty('amount', commitmentData.amount)
    expect(result.data).toHaveProperty('status', 'pending')
    expect(result.data).toHaveProperty('createdAt')
  })

  it('should return 400 if required fields are missing', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: { title: 'Incomplete Commitment' },
      }
    )

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
    expect(result.data).toHaveProperty('error')
    expect(result.data.error).toContain('Missing required fields')
  })

  it('should return 400 if title is missing', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: { amount: 5000 },
      }
    )

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
  })

  it('should return 400 if amount is missing', async () => {
    const request = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: { title: 'No Amount' },
      }
    )

    const response = await POST(request)
    const result = await parseResponse(response)

    expect(result.status).toBe(400)
  })

  it('should generate a unique ID for each commitment', async () => {
    const commitmentData = {
      title: 'Test Commitment',
      amount: 1000,
    }

    const request1 = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: commitmentData,
      }
    )

    const request2 = createMockRequest(
      'http://localhost:3000/api/commitments',
      {
        method: 'POST',
        body: commitmentData,
      }
    )

    const response1 = await POST(request1)
    const response2 = await POST(request2)

    const result1 = await parseResponse(response1)
    const result2 = await parseResponse(response2)

    // IDs should be different
    expect(result1.data.id).not.toBe(result2.data.id)
  })
})
