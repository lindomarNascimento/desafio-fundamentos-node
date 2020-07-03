import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateRepositoryDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && balance.total < value) {
      throw Error('Saldo insuficiente');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
