import { getCustomRepository } from 'typeorm';

import Loan from '../models/Loan';
import LoansRepository from '../repositories/LoansRepository';

interface RequestDTO {
  user_id: string;
}

class ListUserLoansRequestsService {
  public async execute({ user_id }: RequestDTO): Promise<Loan[]> {
    const loansRepository = getCustomRepository(LoansRepository);

    const loans = await loansRepository.find({
      where: { requester_id: user_id },
      relations: ['book', 'book_owner', 'requester'],
    });

    return loans;
  }
}

export default ListUserLoansRequestsService;
