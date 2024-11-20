import { Test } from "@nestjs/testing";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { UnauthorizedException } from "@nestjs/common";

const mockAuthenticationService = {
    setAuth: jest.fn()
}

describe('AuthenticationController', () => {
    let controller: AuthenticationController
    let service: AuthenticationService

    beforeEach(
        async () => {
            const module = await Test.createTestingModule({
                controllers: [AuthenticationController],
                providers: [{
                    provide: AuthenticationService,
                    useValue: mockAuthenticationService
                }
                ]
            }).compile()

            controller = module.get<AuthenticationController>(AuthenticationController)
            service = module.get<AuthenticationService>(AuthenticationService)
        }
    )

    afterAll(
        async () => jest.clearAllMocks()
    )

    it('should be define', () => {
        expect(controller).toBeDefined()
    })

    describe('setAuth', () => {
        it('should be authorized', async () => {
            let email = 'test_authorized@mail.ru'

            mockAuthenticationService.setAuth.mockResolvedValue(
                { access_token: 'token' }
            )

            expect(await controller.setAuth({ email: email })).toEqual({ access_token: 'token' })
        })

        it('should be unauthorized', async () => {
            let email = 'test_unauthorized@mail.ru'

            mockAuthenticationService.setAuth.mockRejectedValue(new UnauthorizedException())

            await expect(controller.setAuth({ email: email })).rejects.toThrow(UnauthorizedException)
        })
    })
})