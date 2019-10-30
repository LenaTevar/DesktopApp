import { TestBed } from '@angular/core/testing'

import { DynamicRemovalService } from './dynamic-removal.service'

describe('DynamicRemovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: DynamicRemovalService = TestBed.get(DynamicRemovalService)
    expect(service).toBeTruthy().catch(error => console.error(error))
  })
})
