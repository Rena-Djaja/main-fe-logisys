import { MovementTransactionType, TransactionStatus } from '@/type/Transaction'
import { Badge } from '@/components/shared/ui/badge'

export const handleMovementTransactionType = (
  type?: MovementTransactionType
) => {
  switch (type) {
    case MovementTransactionType.IN:
      return (
        <Badge className="bg-chart-2/10 text-chart-2">Transaction In</Badge>
      )
    case MovementTransactionType.OUT:
      return (
        <Badge className="bg-destructive/10 text-destructive">
          Transaction Out
        </Badge>
      )
    default:
      return <Badge>-</Badge>
  }
}

export const handleTransactionStatus = (status: TransactionStatus) => {
  switch (status) {
    case TransactionStatus.DELETED:
      return (
        <Badge className="bg-destructive/10 text-destructive">Deleted</Badge>
      )
    case TransactionStatus.DRAFT:
      return <Badge variant={'secondary'}>Save as Draft</Badge>
    case TransactionStatus.CREATED:
      return <Badge className="bg-chart-2/10 text-chart-2">Created</Badge>
  }
}
