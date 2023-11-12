### Problem with index.tsx

- The getPriority function is called multiple times for the same blockchain value during the sorting and filtering of balances. This could be optimized by calculating the priority once and storing it.

- The filtering operation checks if lhsPriority > -99 and balance.amount <= 0. However, the lhsPriority variable is not defined in this scope. This could lead to unexpected behavior.

- The formattedBalances array is created by mapping over sortedBalances, but it's not used anywhere in the code. This is an unnecessary operation that could be removed.

- The useMemo hook is used to memoize the sortedBalances array, but the dependencies array includes prices, which is not used in the calculation of sortedBalances. This could lead to unnecessary recalculations of sortedBalances.

- The rows array is created by mapping over sortedBalances and creating a new WalletRow component for each balance. This could be done directly in the render method, which would avoid the need to create an intermediate array.

- Using the index as a key in a map operation can lead to unexpected behavior if the order of the items changes. It would be better to use a unique identifier from each balance as the key.

- It's better to handle error in useEffecet instead of just console.log it out

### Refactor
- Remove unused objects
- Assuming we format the WalletBalance to FormattedWalletBalance, I add .map function into sorting and filtering of the array.
- I've removed the prices dependency from the useMemo call as it's not used in the computation of sortedBalances.
- I've simplified the sorting condition to getPriority(rhs.blockchain) - getPriority(lhs.blockchain).
- I've combined the filtering, sorting, and mapping operations into a single useMemo call to avoid unnecessary computations.
- I've used useCallback for the getPriority function to avoid unnecessary re-creations of the function.
- I've used balance.currency as the key in the map operation to avoid potential issues with using the index as a key.
- Assumming we have a wrong access to WalletBalance, I have changed .blockchain to .currency as WalletBalance have no property blockchain