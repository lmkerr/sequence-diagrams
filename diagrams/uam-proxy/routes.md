# UAM Proxy Routes

## Partner Service

```mermaid
sequenceDiagram
participant A as UAM Proxy
participant B as Authorizer
participant C as Partner Service
A->>B:Verify Permissions
B->>A:Return Access Allowed
B->>C:`/v1/partners/{+proxy}
Note right of C:test
```

## Webhooks Service

```mermaid
sequenceDiagram
participant A as UAM Proxy
participant B as Authorizer
participant C as Partner Service
A->>B:Verify Permissions
B->>A:Return Access Allowed
B->>C:`/v1/partners/{+proxy}
```