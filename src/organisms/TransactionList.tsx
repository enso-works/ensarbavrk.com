
import { Car, ShoppingCart, Film, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const transactions = [
  {
    date: '2024-04-04',
    icon: Car,
    category: 'ORLEN PAY PLOCK',
    details: 'Card payment',
    amount: -320.25,
    balance: 5200.64,
  },
  {
    date: '2024-04-03',
    icon: ShoppingCart,
    category: 'FRISCO',
    details: 'Card payment',
    amount: -604.79,
    balance: 5520.89,
  },
  {
    date: '2024-04-01',
    icon: Film,
    category: 'Cinema City',
    details: 'Card payment',
    amount: -84.99,
    balance: 6125.68,
  },
  {
    date: '2024-03-29',
    icon: User,
    category: 'Magdalena Kowalska',
    details: 'Transfer',
    amount: 301.23,
    balance: 6210.57,
  },
];

export function TransactionList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Details</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.date + transaction.amount}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <transaction.icon className="w-4 h-4" />
                </div>
                {transaction.category}
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {transaction.details}
            </TableCell>
            <TableCell
              className={`text-right ${
                transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
              }`}>
              {transaction.amount > 0 ? '+' : ''}
              {transaction.amount.toFixed(2)} PLN
            </TableCell>
            <TableCell className="text-right">
              {transaction.balance.toFixed(2)} PLN
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
