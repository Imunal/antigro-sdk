# antigro-sdk

[![codecov](https://codecov.io/gh/Imunal/antigro-sdk/branch/main/graph/badge.svg?token=QEXN83DWAH)](https://codecov.io/gh/Imunal/antigro-sdk)
![tests workflow](https://github.com/Imunal/antigro-sdk/actions/workflows/tests.yml/badge.svg)

**WORK STILL IN PROGRESS**

Antigro SDK for Node.js simplifies integration with the Antigro Designer API, enabling developers to quickly and
efficiently implement key functionalities in their applications. With built-in support for authentication via JWT and
streamlined HTTP client services.

You can check full API doc are available in: [LINK](https://github.com/Imunal/antigro-sdk "LINK")

## Installation

Install the library:

```bash
npm install antigro
```

## Examples

### Initialize Antigro API Client

```typescript
import { Antigro } from './antigro';

const antigro = new Antigro('your-api-secret-key', 'prod');
```

### Retrieve Client Design

```typescript
import { Antigro } from './antigro';

const antigro = new Antigro('your-api-secret-key', 'prod');
try {
  const design = await antigro.getClientDesign('design-id-1234');
  console.log('Client Design:', design);
} catch (error) {
  console.error('Error retrieving client design:', error);
}
```

### Create a New Client Design

```typescript
import { Antigro } from './antigro';

const antigro = new Antigro('your-api-secret-key', 'prod');
try {
  const newDesign = await antigro.createClientDesign({
    name: 'My New Design',
    templateId: 'template-id-1234',
    productParameters: {
      color: 'blue',
      size: 'large',
    },
  });
  console.log('Created Client Design:', newDesign);
} catch (error) {
  console.error('Error creating client design:', error);
}
```

### Update an Existing Client Design

```typescript
import { Antigro } from './antigro';

const antigro = new Antigro('your-api-secret-key', 'prod');
try {
  const isUpdated = await antigro.updateClientDesign({
    designId: 'design-id-1234',
    status: 'PAID',
  });
  console.log('Design updated successfully:', isUpdated);
} catch (error) {
  console.error('Error updating client design:', error);
}
```

