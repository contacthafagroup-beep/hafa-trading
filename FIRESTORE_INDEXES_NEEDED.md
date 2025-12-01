# Firestore Indexes Required

## Customer RFQ Page Index

For the customer RFQ page (`/dashboard/rfqs`) to work properly, you need to create a Firestore composite index.

### Index Details:

**Collection:** `rfqs`

**Fields:**
1. `customerEmail` - Ascending
2. `createdAt` - Descending

### How to Create the Index:

#### Option 1: Automatic (Recommended)
1. Go to `/dashboard/rfqs` as a logged-in customer
2. Open browser console (F12)
3. Firebase will show an error with a link to create the index
4. Click the link in the error message
5. Firebase Console will open with the index pre-configured
6. Click "Create Index"
7. Wait 2-3 minutes for the index to build

#### Option 2: Manual
1. Go to Firebase Console: https://console.firebase.google.com/project/hafa-general-trading-plc/firestore/indexes
2. Click "Create Index"
3. Select collection: `rfqs`
4. Add fields:
   - Field: `customerEmail`, Order: Ascending
   - Field: `createdAt`, Order: Descending
5. Query scope: Collection
6. Click "Create"
7. Wait for index to build (2-3 minutes)

#### Option 3: Using Firebase CLI
```bash
# Add to firestore.indexes.json
{
  "indexes": [
    {
      "collectionGroup": "rfqs",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "customerEmail",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    }
  ]
}

# Then deploy
firebase deploy --only firestore:indexes
```

## RFQ Messages Index

For the messaging feature to work, you also need this index:

**Collection:** `rfqMessages`

**Fields:**
1. `rfqId` - Ascending
2. `createdAt` - Ascending

### Create via Console:
1. Go to Firebase Console > Firestore > Indexes
2. Click "Create Index"
3. Collection: `rfqMessages`
4. Fields:
   - `rfqId` - Ascending
   - `createdAt` - Ascending
5. Click "Create"

## Temporary Workaround

The code has been updated to work without the index by:
1. Fetching all RFQs for the customer
2. Sorting them manually in JavaScript
3. This is slower but works until the index is created

Once the index is created, the query will be much faster!

## Verification

After creating the indexes:
1. Wait 2-3 minutes for them to build
2. Refresh the `/dashboard/rfqs` page
3. RFQs should load quickly
4. Check browser console - should see no index errors

## Index Status

You can check index build status at:
https://console.firebase.google.com/project/hafa-general-trading-plc/firestore/indexes

Indexes show as:
- 🟡 Building (yellow) - Wait a few minutes
- 🟢 Enabled (green) - Ready to use
- 🔴 Error (red) - Check configuration

## All Required Indexes Summary

```json
{
  "indexes": [
    {
      "collectionGroup": "rfqs",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "customerEmail",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "rfqMessages",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "rfqId",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "createdAt",
          "order": "ASCENDING"
        }
      ]
    }
  ]
}
```

## Notes

- Indexes are free and don't count against quotas
- They improve query performance significantly
- Required for compound queries (multiple where/orderBy)
- Build time: Usually 2-5 minutes
- Once built, they work automatically
