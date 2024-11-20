import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = {
    findOne: jest.fn(), 
};


const mockJwtService = {
    signAsync: jest.fn(), 
};

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let userRep: Repository<User>;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthenticationService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository, 
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService, 
                },
            ],
        }).compile();

        service = module.get<AuthenticationService>(AuthenticationService);
        userRep = module.get<Repository<User>>(getRepositoryToken(User));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('setAuth', () => {
        it('should return access token if user is found', async () => {
            const email = 'test@example.com';
            const user = { id: 1, email: email, role: { description: 'Admin' } };
            const expectedAccessToken = 'someAccessToken';

            mockUserRepository.findOne.mockResolvedValue(user);
            mockJwtService.signAsync.mockResolvedValue(expectedAccessToken);

            const result = await service.setAuth(email);
            
            expect(result).toEqual({ access_token: expectedAccessToken });
        });

        it('should throw UnauthorizedException if user is not found', async () => {
            const email = 'nonexistent@example.com';

            mockUserRepository.findOne.mockResolvedValue(null);

            await expect(service.setAuth(email)).rejects.toThrow(UnauthorizedException);
        });
    });
});
