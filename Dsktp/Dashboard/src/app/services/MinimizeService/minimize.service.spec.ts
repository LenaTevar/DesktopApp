import { TestBed } from '@angular/core/testing'

import { MinimizeService } from './minimize.service'

describe('MinimizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: MinimizeService = TestBed.get(MinimizeService)
    expect(service).toBeTruthy().catch(error => console.error(error))
  })
})
