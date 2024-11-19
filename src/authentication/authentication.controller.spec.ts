import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let authenticationController: AuthenticationController;
  let authenticationService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            setAuth: jest.fn().mockResolvedValue({ success: true }),
          },
        },
      ],
    }).compile();

    authenticationController = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(authenticationController).toBeDefined();
  });

  describe('setAuth', () => {
    it('should call AuthenticationService.setAuth with the correct email', async () => {
      const email = { email: 'test@example.com' };
      
      await authenticationController.setAuth(email);

      expect(authenticationService.setAuth).toHaveBeenCalledWith(email.email);
    });

    it('should return the result of AuthenticationService.setAuth', async () => {
      const email = { email: 'test@example.com' };
      
      const result = await authenticationController.setAuth(email);

      expect(result).toEqual({ success: true });
    });
  });
});