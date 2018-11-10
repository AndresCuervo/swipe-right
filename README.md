### A plan:
- Have an input box that you'll type text into!
- Spit that text out onto a canvas that's #2EAFAC bg & black text
- Have a good monospace font from Google Font's :)
- Append "⇢ swipe right ⇢"
- Add a button to save it as a 1080x1080 square for Instagram!!! :)))


----
First test:
cwervo.com homepage shader:
```
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord.xy / iResolution.xy;
    // Shift downward a bit
    uv.y -= 0.5;
    // Normalize & flip across y-axis
    uv += iMouse.xy/iResolution.xy * vec2(1.0, 1.0);
    vec3 col = 0.5 + 0.5*tan(0.6*iTime+uv.xyx+vec3(0,2,4));
    col = 0.5 + 0.5*cos(iTime*0.6+uv.xyx+vec3(0,2,4));
    fragColor = vec4(col * (0.3 + uv.y),0.6);
}
```
