import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="dc">
      <section className="page-head wrap" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="eyebrow">Erreur 404</div>
        <h1>Cette page<br /><em>n&apos;existe pas.</em></h1>
        <p className="lead" style={{ marginBottom: 28 }}>Le lien est peut-être erroné ou la page a été déplacée.</p>
        <Link className="button" href="/">Retour à l&apos;accueil <span aria-hidden="true">↗</span></Link>
      </section>
    </div>
  )
}
