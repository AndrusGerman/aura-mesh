# AuraMesh

AuraMesh es un estudio interactivo de geometría luminosa y refracción controlada con las manos. La demostración generativa funciona sin cámara; al activarla, el procesamiento de vídeo ocurre localmente en el navegador.

## Desarrollo local

Requiere Node.js 24 o posterior.

```powershell
npm run verify
npm start
```

Abre `http://127.0.0.1:4173`.

## Publicación

El sitio se empaqueta como Nginx sin privilegios y se ejecuta en el namespace `andrusdiaz` de Kaido. El Deployment conserva la misma memoria de Bombona: solicitud de `64Mi` y límite de `192Mi`.

GitHub Actions valida el bundle, publica una imagen en Artifact Registry mediante OIDC/WIF y confirma su digest inmutable en `k8s/kaido/kustomization.yaml`. Flux observa el repositorio público desde Kaido, aplica esa ruta y espera el rollout. La Action no contiene kubeconfig ni acceso al API de Kubernetes.

El hostname público previsto es `https://aura-mesh.andrusdiaz.dev`, servido por el túnel compartido `kaido-k3s` hacia `http://aura-mesh.andrusdiaz.svc.cluster.local:80`. No se usa Ingress, NodePort ni LoadBalancer.
