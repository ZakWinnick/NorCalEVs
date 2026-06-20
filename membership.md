---
layout: page
title: "Membership"
description: "Pick how you want to be part of NorCal EVs. Free for everyone, with paid tiers for members who want to go deeper and support what we're building."
page_class: "membership-page"
---

<section class="membership-intro-card">
    <div>
        <div class="eyebrow">Open Membership</div>
        <h2>Join the community, then show up.</h2>
        <p class="membership-lead">NorCal EVs is a registered 501(c)(7) community open to anyone in Northern California who owns, leases, or is curious about electric vehicles. No specific brand, model, or ownership status required. If you're EV-curious and trying to figure out your first EV, you belong here too.</p>
        <span class="first-event-microcopy">Your first event is always free</span>
        <div class="membership-actions">
            <a href="{{ site.baseurl }}/join" class="btn btn-primary">Join the Community</a>
            <a href="{{ site.baseurl }}/#events" class="btn btn-ghost">View Upcoming Events</a>
        </div>
    </div>
    <div class="membership-sidecard">
        <div class="membership-sidecard-label">What To Expect</div>
        <ul class="membership-checklist">
            <li>Cross-brand community with no loyalty test</li>
            <li>Meetups, drives, and practical EV conversations</li>
            <li>A low-pressure way to meet people before you commit</li>
            <li>Our online hub for event details, updates, and discussion</li>
        </ul>
    </div>
</section>

<section class="membership-section">
    <div class="eyebrow">How It Works</div>
    <h2 class="section-title">Five steps. No friction.</h2>
    <div class="membership-funnel">
        <div class="funnel-step">
            <div class="funnel-step-dot">01</div>
            <div class="funnel-step-label">Discover</div>
            <p class="funnel-step-desc">Hear about NorCal EVs from a friend, an event, or online.</p>
        </div>
        <div class="funnel-step">
            <div class="funnel-step-dot">02</div>
            <div class="funnel-step-label">Learn</div>
            <p class="funnel-step-desc">Visit the site and get what we're about in under 30 seconds.</p>
        </div>
        <div class="funnel-step">
            <div class="funnel-step-dot">03</div>
            <div class="funnel-step-label">Join</div>
            <p class="funnel-step-desc">Sign up in our online hub and pick a tier that fits you.</p>
        </div>
        <div class="funnel-step">
            <div class="funnel-step-dot">04</div>
            <div class="funnel-step-label">Attend</div>
            <p class="funnel-step-desc">Come to your first event. First one is always free.</p>
        </div>
        <div class="funnel-step">
            <div class="funnel-step-dot">05</div>
            <div class="funnel-step-label">Stay</div>
            <p class="funnel-step-desc">Keep coming back. That's the whole thing.</p>
        </div>
    </div>
</section>

<section class="membership-section">
    <div class="eyebrow">Tiers</div>
    <h2 class="section-title">Pick what fits. Upgrade when it makes sense.</h2>
    {% comment %} Launch Edition promo: Long Range at $30 for the first year,
    first 30 members. No payment backend yet, so launch_claimed is maintained by
    hand. When launch_claimed reaches launch_total the banner drops off the page
    automatically (per spec: remove the promotion once 30 spots are filled). {% endcomment %}
    {% assign launch_claimed = 0 %}
    {% assign launch_total = 30 %}
    {% if launch_claimed < launch_total %}
    <div class="launch-promo">
        <div class="launch-promo-main">
            <span class="launch-promo-badge">Launch Edition</span>
            <h3>Long Range for $30 your first year.</h3>
            <p>A founding rate for the first 30 members. It renews at $50 a year after that. Once 30 spots are claimed, this offer is gone.</p>
        </div>
        <div class="launch-promo-side">
            <a href="{{ site.baseurl }}/join" class="btn btn-primary">Claim the Launch Rate</a>
        </div>
    </div>
    {% endif %}
    <div class="tier-grid tier-grid-3">
        <div class="tier-card">
            <h4>Standard Range</h4>
            <div class="tier-price">Free</div>
            <ul>
                <li>Access to all events</li>
                <li>Community discussions and member communications</li>
                <li>A way to join the community and see what NorCal EVs is about</li>
            </ul>
            <a href="{{ site.baseurl }}/join" class="btn btn-ghost tier-cta">Join Free</a>
        </div>
        <div class="tier-card tier-highlight">
            <span class="tier-badge">Best Value</span>
            <h4>Long Range</h4>
            <div class="tier-price">$50 <span>/ year</span></div>
            <ul>
                <li>Everything in Standard Range</li>
                <li>Free admission to member-only events</li>
                <li>20% off paid events</li>
                <li>10% off the NorCal EVs shop</li>
                <li>Voting rights on community decisions</li>
                <li>NorCal EVs member sticker included</li>
            </ul>
            <a href="{{ site.baseurl }}/join" class="btn btn-primary tier-cta">Choose Long Range</a>
        </div>
        <div class="tier-card">
            <h4>Max Pack</h4>
            <div class="tier-price">$500 <span>lifetime</span></div>
            <ul>
                <li>Everything in Long Range, forever</li>
                <li>50% off paid events</li>
                <li>50% off the NorCal EVs shop at signup</li>
                <li>Permanent recognition on the website and in the community</li>
                <li>NorCal EVs member sticker included</li>
            </ul>
            <a href="{{ site.baseurl }}/join" class="btn btn-ghost tier-cta">Go Max Pack</a>
        </div>
    </div>
    <p class="tier-note">Being part of NorCal EVs has always been free, and that's not changing. Paid memberships are for people who want to support what we're building, get more out of the community, and have a say in where it goes.</p>
</section>

<section class="membership-section">
    <div class="eyebrow">What Members Get</div>
    <h2 class="section-title">Real community benefits, listed honestly.</h2>
    <ul class="membership-benefits-list">
        <li>Access to every event, discussion, and member communication (all tiers)</li>
        <li>Free admission to member-only events (Long Range and up)</li>
        <li>Tier-based discounts on paid events and the NorCal EVs shop (Long Range and Max Pack)</li>
        <li>Voting rights on community decisions (Long Range and Max Pack)</li>
        <li>A NorCal EVs member sticker (Long Range and up)</li>
        <li>Real-world community: drives, meetups, and shared experiences across every brand</li>
    </ul>
</section>

<section class="membership-note">
    <div class="eyebrow">All Brands Welcome</div>
    <h2>From Tesla to Kia to "still deciding."</h2>
    <p>The community is bigger than any one manufacturer. The best conversations happen when longtime EV owners, first-time buyers, and EV-curious newcomers all end up in the same parking lot.</p>
</section>
